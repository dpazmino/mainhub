import { db } from "./db";
import { students, studentGoals, studentSkills, placements, studentOutcomes, mentors, devices, deviceAllocations } from "@shared/schema";
import fs from "fs";
import path from "path";

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

function getAssetPath(filename: string): string {
  // Try multiple paths for dev and production
  const paths = [
    path.join(process.cwd(), "attached_assets", filename),
    path.join(process.cwd(), "dist/attached_assets", filename),
    path.join(__dirname, "../attached_assets", filename),
    path.join(__dirname, "attached_assets", filename),
  ];
  
  for (const p of paths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  
  // Default to first path
  return paths[0];
}

async function seedDatabase() {
  console.log("Starting database seed...");

  // Read CSV files
  const studentsCsv = fs.readFileSync(
    getAssetPath("student_synthetic_1769631587193.csv"),
    "utf-8"
  );
  const goalsCsv = fs.readFileSync(
    getAssetPath("student_goal_1769631587191.csv"),
    "utf-8"
  );
  const skillsCsv = fs.readFileSync(
    getAssetPath("student_skill_1769631587192.csv"),
    "utf-8"
  );
  const placementsCsv = fs.readFileSync(
    getAssetPath("placements_1769631587189.csv"),
    "utf-8"
  );
  const outcomesCsv = fs.readFileSync(
    getAssetPath("student_ouctome_1769631587190.csv"),
    "utf-8"
  );
  const mentorsCsv = fs.readFileSync(
    getAssetPath("mentor_synthetic_1769631587192.csv"),
    "utf-8"
  );

  // Parse students
  const studentData = parseCsv(studentsCsv, (r) => ({
    id: r.student_id,
    userId: null,
    ageRange: r.age_range,
    enrollmentDate: r.enrollment_date,
    email: r.email,
    phone: r.phone,
    gradeLevel: r.grade_level,
    schoolType: r.school_type,
    emergencyContact: r.emergency_contact,
    hasIep: parseBool(r.has_iep),
    primaryLanguage: r.primary_language,
    transportationNeeds: parseBool(r.transportation_needs),
    photoConsent: parseBool(r.photo_consent),
    status: r.status,
  }));

  // Parse goals
  const goalData = parseCsv(goalsCsv, (r) => ({
    id: r.goal_id,
    studentId: r.student_id,
    goalType: r.goal_type,
    goalTitle: r.goal_title,
    description: r.description,
    startDate: r.start_date,
    targetCompletionDate: r.target_completion_date,
    actualCompletionDate: parseNullable(r.actual_completion_date),
    priority: r.priority,
    progressPercentage: parseNum(r.progress_percentage),
    milestonesTotal: parseNum(r.milestones_total),
    milestonesCompleted: parseNum(r.milestones_completed),
    mentorAssignedId: r.mentor_assigned_id,
    staffAssignedId: r.staff_assigned_id,
    programId: r.program_id,
    barriersIdentified: parseNullable(r.barriers_identified),
    supportNeeded: r.support_needed,
    lastReviewDate: r.last_review_date,
    nextReviewDate: r.next_review_date,
    notes: r.notes,
    status: r.status,
  }));

  // Parse skills
  const skillData = parseCsv(skillsCsv, (r) => ({
    id: r.student_skill_id,
    studentId: r.student_id,
    skillId: r.skill_id,
    skillName: r.skill_id, // Using skill_id as name for now
    initialAssessmentDate: r.initial_assessment_date,
    initialProficiencyLevel: r.initial_proficiency_level,
    currentProficiencyLevel: r.current_proficiency_level,
    targetProficiencyLevel: r.target_proficiency_level,
    lastAssessmentDate: r.last_assessment_date,
    assessmentScore: parseNum(r.assessment_score),
    hoursPracticed: parseNum(r.hours_practiced),
    projectsCompleted: parseNum(r.projects_completed),
    assessedByStaffId: r.assessed_by_staff_id,
    learningStyle: r.learning_style,
    strengths: r.strengths,
    areasForImprovement: r.areas_for_improvement,
    recommendedNextSteps: r.recommended_next_steps,
    progressNotes: r.progress_notes,
    status: r.status,
  }));

  // Parse placements
  const placementData = parseCsv(placementsCsv, (r) => ({
    id: r.placement_id,
    studentId: r.student_id,
    placementType: r.placement_type,
    employerName: r.employer_name,
    industry: r.industry,
    jobTitle: r.job_title,
    hourlyWage: r.hourly_wage || "0",
    hoursPerWeek: parseNum(r.hours_per_week),
    startDate: r.start_date,
    endDate: parseNullable(r.end_date),
    isCurrent: parseBool(r.is_current),
    betterYouthReferral: parseBool(r.better_youth_referral),
    performanceRating: r.performance_rating,
    benefitsOffered: parseBool(r.benefits_offered),
    careerAdvancementOpportunity: parseBool(r.career_advancement_opportunity),
    supervisorName: r.supervisor_name,
    supervisorPhone: r.supervisor_phone,
    supervisorEmail: r.supervisor_email,
    mentorAtWorkplace: parseBool(r.mentor_at_workplace),
    skillsMatchTraining: parseBool(r.skills_match_training),
    placementNotes: r.placement_notes,
    status: r.status,
  }));

  // Parse outcomes
  const outcomeData = parseCsv(outcomesCsv, (r) => ({
    id: r.outcome_id,
    studentId: r.student_id,
    metricId: r.metric_id,
    measurementDate: r.measurement_date,
    measurementPeriod: r.measurement_period,
    value: parseNum(r.value),
    previousValue: parseNum(r.previous_value),
    targetValue: parseNum(r.target_value),
    targetMet: parseBool(r.target_met),
    improvementFromBaseline: parseNum(r.improvement_from_baseline),
    percentileRank: parseNum(r.percentile_rank),
    assessedByStaffId: r.assessed_by_staff_id,
    assessmentMethod: r.assessment_method,
    confidenceLevel: r.confidence_level,
    supportingEvidence: r.supporting_evidence,
    contextNotes: r.context_notes,
    programId: r.program_id,
    cohortId: r.cohort_id,
    followUpRequired: parseBool(r.follow_up_required),
    interventionRecommended: parseNullable(r.intervention_recommended),
    dataQualityFlag: r.data_quality_flag,
  }));

  // Parse mentors
  const mentorData = parseCsv(mentorsCsv, (r) => ({
    id: r.mentor_id,
    userId: null,
    email: r.email,
    phone: r.phone,
    mentorType: r.mentor_type,
    industry: r.industry,
    companyType: r.company_type,
    roleCategory: r.role_category,
    yearsExperience: parseNum(r.years_experience),
    skillsOffered: r.skills_offered,
    availability: r.availability,
    maxMentees: parseNum(r.max_mentees),
    currentMentees: parseNum(r.current_mentees),
    backgroundCheckStatus: r.background_check_status,
    trainingCompleted: parseBool(r.training_completed),
    startDate: r.start_date,
    status: r.status,
  }));

  // Insert data in order
  console.log(`Inserting ${studentData.length} students...`);
  if (studentData.length > 0) {
    await db.insert(students).values(studentData).onConflictDoNothing();
  }

  console.log(`Inserting ${goalData.length} goals...`);
  if (goalData.length > 0) {
    await db.insert(studentGoals).values(goalData).onConflictDoNothing();
  }

  console.log(`Inserting ${skillData.length} skills...`);
  if (skillData.length > 0) {
    await db.insert(studentSkills).values(skillData).onConflictDoNothing();
  }

  console.log(`Inserting ${placementData.length} placements...`);
  if (placementData.length > 0) {
    await db.insert(placements).values(placementData).onConflictDoNothing();
  }

  console.log(`Inserting ${outcomeData.length} outcomes...`);
  if (outcomeData.length > 0) {
    await db.insert(studentOutcomes).values(outcomeData).onConflictDoNothing();
  }

  console.log(`Inserting ${mentorData.length} mentors...`);
  if (mentorData.length > 0) {
    await db.insert(mentors).values(mentorData).onConflictDoNothing();
  }

  // Read and parse devices
  const devicesCsvPath = getAssetPath("devices_1769645792231.csv");
  const allocationsCsvPath = getAssetPath("device_allocations_1769645792230.csv");
  
  if (fs.existsSync(devicesCsvPath)) {
    const devicesCsv = fs.readFileSync(devicesCsvPath, "utf-8");
    const deviceData = parseCsv(devicesCsv, (r) => ({
      id: r.serial_number,
      resourceId: r.resource_id,
      resourceName: r.resource_name,
      resourceType: r.resource_type,
      description: r.description,
      category: r.category,
      brand: r.brand,
      modelNumber: r.model_number,
      serialNumber: r.serial_number,
      purchaseDate: r.purchase_date,
      purchaseCost: r.purchase_cost,
      currentValue: r.current_value,
      warrantyExpiration: r.warranty_expiration,
      location: r.location,
      condition: r.condition,
      maintenanceSchedule: r.maintenance_schedule,
      lastMaintenanceDate: r.last_maintenance_date,
      checkoutAllowed: parseBool(r.checkout_allowed),
      maxCheckoutDays: parseNum(r.max_checkout_days),
      requiresTraining: parseBool(r.requires_training),
      responsibleStaffId: r.responsible_staff_id,
      insuranceValue: r.insurance_value,
      status: r.status,
    }));

    console.log(`Inserting ${deviceData.length} devices...`);
    if (deviceData.length > 0) {
      await db.insert(devices).values(deviceData).onConflictDoNothing();
    }
  }

  if (fs.existsSync(allocationsCsvPath)) {
    const allocationsCsv = fs.readFileSync(allocationsCsvPath, "utf-8");
    const allocationData = parseCsv(allocationsCsv, (r) => ({
      id: r.allocation_id,
      deviceId: r.resource_id ? `SN-61000${r.resource_id.replace('RES-', '')}`.slice(0, 12) : null,
      studentId: parseNullable(r.student_id),
      staffId: parseNullable(r.staff_id),
      programId: parseNullable(r.program_id),
      projectId: parseNullable(r.project_id),
      allocatedToType: r.allocated_to_type,
      allocationPurpose: r.allocation_purpose,
      requestDate: r.request_date,
      checkoutDate: r.checkout_date,
      expectedReturnDate: r.expected_return_date,
      actualReturnDate: parseNullable(r.actual_return_date),
      checkoutStaffId: r.checkout_staff_id,
      checkinStaffId: parseNullable(r.checkin_staff_id),
      conditionAtCheckout: r.condition_at_checkout,
      conditionAtReturn: parseNullable(r.condition_at_return),
      damageReported: parseBool(r.damage_reported),
      damageDescription: parseNullable(r.damage_description),
      repairCost: parseNullable(r.repair_cost),
      lateReturn: parseBool(r.late_return),
      lateFeeCharged: parseNullable(r.late_fee_charged),
      trainingVerified: parseBool(r.training_verified),
      agreementSigned: parseBool(r.agreement_signed),
      notes: parseNullable(r.notes),
      status: r.status,
    }));

    console.log(`Inserting ${allocationData.length} device allocations...`);
    if (allocationData.length > 0) {
      await db.insert(deviceAllocations).values(allocationData).onConflictDoNothing();
    }
  }

  console.log("Database seed completed!");
  return { success: true, message: "Database seeded successfully" };
}

// Export for use in API endpoint
export { seedDatabase };
