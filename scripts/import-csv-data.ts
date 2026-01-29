import fs from "fs";
import path from "path";
import { db } from "../server/db";
import {
  students,
  studentGoals,
  studentSkills,
  studentOutcomes,
  studentCertifications,
} from "../shared/schema";

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",");
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row: Record<string, string> = {};
    headers.forEach((header, idx) => {
      row[header.trim()] = values[idx] || "";
    });
    rows.push(row);
  }

  return rows;
}

function parseValue(val: string): string | null {
  if (!val || val === "null" || val === "") return null;
  return val;
}

function parseNumber(val: string): number | null {
  if (!val || val === "null" || val === "") return null;
  const num = parseFloat(val);
  return isNaN(num) ? null : num;
}

function parseBool(val: string): boolean {
  return val === "true" || val === "1";
}

async function importData() {
  console.log("Starting data import...");

  const goalsFile = path.join(
    process.cwd(),
    "attached_assets/student_goals_amer_1769645493370.csv"
  );
  const skillsFile = path.join(
    process.cwd(),
    "attached_assets/student_skills_amer_1769645493369.csv"
  );
  const outcomesFile = path.join(
    process.cwd(),
    "attached_assets/student_outcomes_amer_1769645493369.csv"
  );
  const certsFile = path.join(
    process.cwd(),
    "attached_assets/student_certifications_amer_1769645493370.csv"
  );

  const goalsData = parseCSV(fs.readFileSync(goalsFile, "utf-8"));
  const skillsData = parseCSV(fs.readFileSync(skillsFile, "utf-8"));
  const outcomesData = parseCSV(fs.readFileSync(outcomesFile, "utf-8"));
  const certsData = parseCSV(fs.readFileSync(certsFile, "utf-8"));

  console.log(`Goals: ${goalsData.length} records`);
  console.log(`Skills: ${skillsData.length} records`);
  console.log(`Outcomes: ${outcomesData.length} records`);
  console.log(`Certifications: ${certsData.length} records`);

  const uniqueStudentIds = new Set<string>();
  goalsData.forEach((row) => uniqueStudentIds.add(row.student_id));
  skillsData.forEach((row) => uniqueStudentIds.add(row.student_id));
  outcomesData.forEach((row) => uniqueStudentIds.add(row.student_id));
  certsData.forEach((row) => uniqueStudentIds.add(row.student_id));

  console.log(`Unique students: ${uniqueStudentIds.size}`);

  console.log("Creating students...");
  const studentRecords = Array.from(uniqueStudentIds).map((id) => ({
    id,
    ageRange: ["14-16", "17-18", "19-21", "11-13"][Math.floor(Math.random() * 4)],
    enrollmentDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    email: `${id.toLowerCase().replace("-", "")}@betteryouth.org`,
    phone: `555-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
    gradeLevel: String(Math.floor(Math.random() * 7) + 6),
    schoolType: ["Public", "Private", "Charter"][Math.floor(Math.random() * 3)],
    primaryLanguage: "English",
    status: "Active",
  }));

  for (const record of studentRecords) {
    try {
      await db.insert(students).values(record).onConflictDoNothing();
    } catch (e) {
      console.log(`Student ${record.id} already exists or error`);
    }
  }
  console.log("Students created.");

  console.log("Importing goals...");
  let goalsImported = 0;
  for (const row of goalsData) {
    try {
      await db
        .insert(studentGoals)
        .values({
          id: row.goal_id,
          studentId: row.student_id,
          goalType: parseValue(row.goal_type) || "Career",
          goalTitle: parseValue(row.goal_title) || "Goal",
          description: parseValue(row.description),
          startDate: parseValue(row.start_date),
          targetCompletionDate: parseValue(row.target_completion_date),
          actualCompletionDate: parseValue(row.actual_completion_date),
          priority: parseValue(row.priority),
          progressPercentage: parseNumber(row.progress_percentage) as number,
          milestonesTotal: parseNumber(row.milestones_total) as number,
          milestonesCompleted: parseNumber(row.milestones_completed) as number,
          mentorAssignedId: parseValue(row.mentor_assigned_id),
          staffAssignedId: parseValue(row.staff_assigned_id),
          programId: parseValue(row.program_id),
          barriersIdentified: parseValue(row.barriers_identified),
          supportNeeded: parseValue(row.support_needed),
          lastReviewDate: parseValue(row.last_review_date),
          nextReviewDate: parseValue(row.next_review_date),
          notes: parseValue(row.notes),
          status: parseValue(row.status) || "Active",
        })
        .onConflictDoNothing();
      goalsImported++;
    } catch (e) {
      // Skip duplicates
    }
  }
  console.log(`Goals imported: ${goalsImported}`);

  console.log("Importing skills...");
  let skillsImported = 0;
  for (const row of skillsData) {
    try {
      await db
        .insert(studentSkills)
        .values({
          id: row.student_skill_id,
          studentId: row.student_id,
          skillId: row.skill_id,
          skillName: row.skill_id,
          initialAssessmentDate: parseValue(row.initial_assessment_date),
          initialProficiencyLevel: parseValue(row.initial_proficiency_level),
          currentProficiencyLevel: parseValue(row.current_proficiency_level),
          targetProficiencyLevel: parseValue(row.target_proficiency_level),
          lastAssessmentDate: parseValue(row.last_assessment_date),
          assessmentScore: parseNumber(row.assessment_score) as number,
          hoursPracticed: parseNumber(row.hours_practiced) as number,
          projectsCompleted: parseNumber(row.projects_completed) as number,
          assessedByStaffId: parseValue(row.assessed_by_staff_id),
          learningStyle: parseValue(row.learning_style),
          strengths: parseValue(row.strengths),
          areasForImprovement: parseValue(row.areas_for_improvement),
          recommendedNextSteps: parseValue(row.recommended_next_steps),
          progressNotes: parseValue(row.progress_notes),
          status: parseValue(row.status) || "Active",
        })
        .onConflictDoNothing();
      skillsImported++;
    } catch (e) {
      // Skip duplicates
    }
  }
  console.log(`Skills imported: ${skillsImported}`);

  console.log("Importing outcomes...");
  let outcomesImported = 0;
  for (const row of outcomesData) {
    try {
      await db
        .insert(studentOutcomes)
        .values({
          id: row.outcome_id,
          studentId: row.student_id,
          metricId: row.metric_id,
          measurementDate: parseValue(row.measurement_date),
          measurementPeriod: parseValue(row.measurement_period),
          value: parseNumber(row.value) as number,
          previousValue: parseNumber(row.previous_value) as number,
          targetValue: parseNumber(row.target_value) as number,
          targetMet: parseBool(row.target_met),
          improvementFromBaseline: parseNumber(row.improvement_from_baseline) as number,
          percentileRank: parseNumber(row.percentile_rank) as number,
          assessedByStaffId: parseValue(row.assessed_by_staff_id),
          assessmentMethod: parseValue(row.assessment_method),
          confidenceLevel: parseValue(row.confidence_level),
          supportingEvidence: parseValue(row.supporting_evidence),
          contextNotes: parseValue(row.context_notes),
          programId: parseValue(row.program_id),
          cohortId: parseValue(row.cohort_id),
          followUpRequired: parseBool(row.follow_up_required),
          interventionRecommended: parseValue(row.intervention_recommended),
          dataQualityFlag: parseValue(row.data_quality_flag),
        })
        .onConflictDoNothing();
      outcomesImported++;
    } catch (e) {
      // Skip duplicates
    }
  }
  console.log(`Outcomes imported: ${outcomesImported}`);

  console.log("Importing certifications...");
  let certsImported = 0;
  for (const row of certsData) {
    try {
      await db
        .insert(studentCertifications)
        .values({
          id: row.student_cert_id,
          studentId: row.student_id,
          certificationId: row.certification_id,
          attemptDate: parseValue(row.attempt_date),
          attemptNumber: parseNumber(row.attempt_number) as number,
          examScore: parseValue(row.exam_score),
          passed: parseBool(row.passed),
          issueDate: parseValue(row.issue_date),
          expirationDate: parseValue(row.expiration_date),
          certificateNumber: parseValue(row.certificate_number),
          verifiedByStaffId: parseValue(row.verified_by_staff_id),
          digitalBadgeIssued: parseBool(row.digital_badge_issued),
          badgeUrl: parseValue(row.badge_url),
          linkedToPortfolio: parseBool(row.linked_to_portfolio),
          employerVerified: parseBool(row.employer_verified),
          renewalReminderSent: parseBool(row.renewal_reminder_sent),
          status: parseValue(row.status) || "Active",
          notes: parseValue(row.notes),
        })
        .onConflictDoNothing();
      certsImported++;
    } catch (e) {
      // Skip duplicates
    }
  }
  console.log(`Certifications imported: ${certsImported}`);

  console.log("Import complete!");
  process.exit(0);
}

importData().catch((e) => {
  console.error("Import failed:", e);
  process.exit(1);
});
