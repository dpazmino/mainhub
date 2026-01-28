export type Student = {
  student_id: string;
  student_hash: string;
  age_range: string;
  enrollment_date: string;
  email: string;
  phone: string;
  grade_level: string;
  school_type: string;
  emergency_contact: string;
  has_iep: boolean;
  primary_language: string;
  transportation_needs: boolean;
  photo_consent: boolean;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Placement = {
  placement_id: string;
  student_id: string;
  placement_type: string;
  employer_name: string;
  industry: string;
  job_title: string;
  hourly_wage: number;
  hours_per_week: number;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  better_youth_referral: boolean;
  performance_rating: string;
  benefits_offered: boolean;
  career_advancement_opportunity: boolean;
  supervisor_name: string;
  supervisor_phone: string;
  supervisor_email: string;
  mentor_at_workplace: boolean;
  skills_match_training: boolean;
  placement_notes: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type StudentGoal = {
  goal_id: string;
  student_id: string;
  goal_type: string;
  goal_title: string;
  description: string;
  start_date: string;
  target_completion_date: string;
  actual_completion_date: string | null;
  priority: string;
  progress_percentage: number;
  milestones_total: number;
  milestones_completed: number;
  mentor_assigned_id: string;
  staff_assigned_id: string;
  program_id: string;
  barriers_identified: string | null;
  support_needed: string;
  last_review_date: string;
  next_review_date: string;
  notes: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type StudentOutcome = {
  outcome_id: string;
  student_id: string;
  metric_id: string;
  measurement_date: string;
  measurement_period: string;
  value: number;
  previous_value: number;
  target_value: number;
  target_met: boolean;
  improvement_from_baseline: number;
  percentile_rank: number;
  assessed_by_staff_id: string;
  assessment_method: string;
  confidence_level: string;
  supporting_evidence: string;
  context_notes: string;
  program_id: string;
  cohort_id: string;
  follow_up_required: boolean;
  intervention_recommended: string | null;
  data_quality_flag: string;
  created_at: string;
  updated_at: string;
};

export type StudentSkill = {
  student_skill_id: string;
  student_id: string;
  skill_id: string;
  initial_assessment_date: string;
  initial_proficiency_level: string;
  current_proficiency_level: string;
  target_proficiency_level: string;
  last_assessment_date: string;
  assessment_score: number;
  hours_practiced: number;
  projects_completed: number;
  assessed_by_staff_id: string;
  learning_style: string;
  strengths: string;
  areas_for_improvement: string;
  recommended_next_steps: string;
  progress_notes: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Mentor = {
  mentor_id: string;
  mentor_hash: string;
  email: string;
  phone: string;
  mentor_type: string;
  industry: string;
  company_type: string;
  role_category: string;
  years_experience: number;
  skills_offered: string;
  availability: string;
  max_mentees: number;
  current_mentees: number;
  background_check_status: string;
  training_completed: boolean;
  start_date: string;
  status: string;
  created_at: string;
  updated_at: string;
};

function parseBool(v: string): boolean {
  return v.trim().toLowerCase() === "true";
}

function parseNum(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function parseNullable(v: string): string | null {
  const t = v.trim();
  return t === "" || t.toLowerCase() === "null" ? null : t;
}

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }

    cur += ch;
  }

  out.push(cur);
  return out;
}

function parseCsv<T>(csv: string, mapRow: (row: Record<string, string>) => T): T[] {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] ?? "";
    });
    return mapRow(row);
  });
}

let cache:
  | null
  | {
      students: Student[];
      placements: Placement[];
      goals: StudentGoal[];
      outcomes: StudentOutcome[];
      skills: StudentSkill[];
      mentors: Mentor[];
    } = null;

export async function loadDataset() {
  if (cache) return cache;

  const [placementsCsv, studentsCsv, goalsCsv, outcomesCsv, skillsCsv, mentorsCsv] = await Promise.all([
    fetch("/../attached_assets/placements_1769631587189.csv").then((r) => r.text()),
    fetch("/../attached_assets/student_synthetic_1769631587193.csv").then((r) => r.text()),
    fetch("/../attached_assets/student_goal_1769631587191.csv").then((r) => r.text()),
    fetch("/../attached_assets/student_ouctome_1769631587190.csv").then((r) => r.text()),
    fetch("/../attached_assets/student_skill_1769631587192.csv").then((r) => r.text()),
    fetch("/../attached_assets/mentor_synthetic_1769631587192.csv").then((r) => r.text()),
  ]);

  const students = parseCsv<Student>(studentsCsv, (r) => ({
    student_id: r.student_id,
    student_hash: r.student_hash,
    age_range: r.age_range,
    enrollment_date: r.enrollment_date,
    email: r.email,
    phone: r.phone,
    grade_level: r.grade_level,
    school_type: r.school_type,
    emergency_contact: r.emergency_contact,
    has_iep: parseBool(r.has_iep),
    primary_language: r.primary_language,
    transportation_needs: parseBool(r.transportation_needs),
    photo_consent: parseBool(r.photo_consent),
    status: r.status,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  const placements = parseCsv<Placement>(placementsCsv, (r) => ({
    placement_id: r.placement_id,
    student_id: r.student_id,
    placement_type: r.placement_type,
    employer_name: r.employer_name,
    industry: r.industry,
    job_title: r.job_title,
    hourly_wage: parseNum(r.hourly_wage),
    hours_per_week: parseNum(r.hours_per_week),
    start_date: r.start_date,
    end_date: parseNullable(r.end_date),
    is_current: parseBool(r.is_current),
    better_youth_referral: parseBool(r.better_youth_referral),
    performance_rating: r.performance_rating,
    benefits_offered: parseBool(r.benefits_offered),
    career_advancement_opportunity: parseBool(r.career_advancement_opportunity),
    supervisor_name: r.supervisor_name,
    supervisor_phone: r.supervisor_phone,
    supervisor_email: r.supervisor_email,
    mentor_at_workplace: parseBool(r.mentor_at_workplace),
    skills_match_training: parseBool(r.skills_match_training),
    placement_notes: r.placement_notes,
    status: r.status,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  const goals = parseCsv<StudentGoal>(goalsCsv, (r) => ({
    goal_id: r.goal_id,
    student_id: r.student_id,
    goal_type: r.goal_type,
    goal_title: r.goal_title,
    description: r.description,
    start_date: r.start_date,
    target_completion_date: r.target_completion_date,
    actual_completion_date: parseNullable(r.actual_completion_date),
    priority: r.priority,
    progress_percentage: parseNum(r.progress_percentage),
    milestones_total: parseNum(r.milestones_total),
    milestones_completed: parseNum(r.milestones_completed),
    mentor_assigned_id: r.mentor_assigned_id,
    staff_assigned_id: r.staff_assigned_id,
    program_id: r.program_id,
    barriers_identified: parseNullable(r.barriers_identified),
    support_needed: r.support_needed,
    last_review_date: r.last_review_date,
    next_review_date: r.next_review_date,
    notes: r.notes,
    status: r.status,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  const outcomes = parseCsv<StudentOutcome>(outcomesCsv, (r) => ({
    outcome_id: r.outcome_id,
    student_id: r.student_id,
    metric_id: r.metric_id,
    measurement_date: r.measurement_date,
    measurement_period: r.measurement_period,
    value: parseNum(r.value),
    previous_value: parseNum(r.previous_value),
    target_value: parseNum(r.target_value),
    target_met: parseBool(r.target_met),
    improvement_from_baseline: parseNum(r.improvement_from_baseline),
    percentile_rank: parseNum(r.percentile_rank),
    assessed_by_staff_id: r.assessed_by_staff_id,
    assessment_method: r.assessment_method,
    confidence_level: r.confidence_level,
    supporting_evidence: r.supporting_evidence,
    context_notes: r.context_notes,
    program_id: r.program_id,
    cohort_id: r.cohort_id,
    follow_up_required: parseBool(r.follow_up_required),
    intervention_recommended: parseNullable(r.intervention_recommended),
    data_quality_flag: r.data_quality_flag,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  const skills = parseCsv<StudentSkill>(skillsCsv, (r) => ({
    student_skill_id: r.student_skill_id,
    student_id: r.student_id,
    skill_id: r.skill_id,
    initial_assessment_date: r.initial_assessment_date,
    initial_proficiency_level: r.initial_proficiency_level,
    current_proficiency_level: r.current_proficiency_level,
    target_proficiency_level: r.target_proficiency_level,
    last_assessment_date: r.last_assessment_date,
    assessment_score: parseNum(r.assessment_score),
    hours_practiced: parseNum(r.hours_practiced),
    projects_completed: parseNum(r.projects_completed),
    assessed_by_staff_id: r.assessed_by_staff_id,
    learning_style: r.learning_style,
    strengths: r.strengths,
    areas_for_improvement: r.areas_for_improvement,
    recommended_next_steps: r.recommended_next_steps,
    progress_notes: r.progress_notes,
    status: r.status,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  const mentors = parseCsv<Mentor>(mentorsCsv, (r) => ({
    mentor_id: r.mentor_id,
    mentor_hash: r.mentor_hash,
    email: r.email,
    phone: r.phone,
    mentor_type: r.mentor_type,
    industry: r.industry,
    company_type: r.company_type,
    role_category: r.role_category,
    years_experience: parseNum(r.years_experience),
    skills_offered: r.skills_offered,
    availability: r.availability,
    max_mentees: parseNum(r.max_mentees),
    current_mentees: parseNum(r.current_mentees),
    background_check_status: r.background_check_status,
    training_completed: parseBool(r.training_completed),
    start_date: r.start_date,
    status: r.status,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  cache = { students, placements, goals, outcomes, skills, mentors };
  return cache;
}

export function buildIndexes(data: Awaited<ReturnType<typeof loadDataset>>) {
  const studentById = new Map(data.students.map((s) => [s.student_id, s] as const));

  const placementsByStudentId = new Map<string, Placement[]>();
  for (const p of data.placements) {
    const arr = placementsByStudentId.get(p.student_id) ?? [];
    arr.push(p);
    placementsByStudentId.set(p.student_id, arr);
  }

  const goalsByStudentId = new Map<string, StudentGoal[]>();
  for (const g of data.goals) {
    const arr = goalsByStudentId.get(g.student_id) ?? [];
    arr.push(g);
    goalsByStudentId.set(g.student_id, arr);
  }

  const outcomesByStudentId = new Map<string, StudentOutcome[]>();
  for (const o of data.outcomes) {
    const arr = outcomesByStudentId.get(o.student_id) ?? [];
    arr.push(o);
    outcomesByStudentId.set(o.student_id, arr);
  }

  const skillsByStudentId = new Map<string, StudentSkill[]>();
  for (const sk of data.skills) {
    const arr = skillsByStudentId.get(sk.student_id) ?? [];
    arr.push(sk);
    skillsByStudentId.set(sk.student_id, arr);
  }

  const activeMentors = data.mentors.filter((m) => m.status.toLowerCase() === "active");

  return {
    studentById,
    placementsByStudentId,
    goalsByStudentId,
    outcomesByStudentId,
    skillsByStudentId,
    activeMentors,
  };
}
