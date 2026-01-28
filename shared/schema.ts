import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer, decimal, timestamp, index, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Export and import Replit Auth tables (sessions and users table from auth blueprint)
export * from "./models/auth";
import { users, sessions } from "./models/auth";

// User roles extension (extends the Replit Auth users table with role info)
export const userRoles = pgTable("user_roles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique(),
  role: text("role").notNull(), // 'student', 'staff', 'mentor'
  studentId: varchar("student_id"), // references student record if role=student
  mentorId: varchar("mentor_id"), // references mentor record if role=mentor
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Students table
export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  ageRange: text("age_range"),
  enrollmentDate: text("enrollment_date"),
  email: text("email"),
  phone: text("phone"),
  gradeLevel: text("grade_level"),
  schoolType: text("school_type"),
  emergencyContact: text("emergency_contact"),
  hasIep: boolean("has_iep").default(false),
  primaryLanguage: text("primary_language"),
  transportationNeeds: boolean("transportation_needs").default(false),
  photoConsent: boolean("photo_consent").default(false),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Student Goals table
export const studentGoals = pgTable("student_goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id),
  goalType: text("goal_type").notNull(),
  goalTitle: text("goal_title").notNull(),
  description: text("description"),
  startDate: text("start_date"),
  targetCompletionDate: text("target_completion_date"),
  actualCompletionDate: text("actual_completion_date"),
  priority: text("priority"), // 'high', 'medium', 'low'
  progressPercentage: integer("progress_percentage").default(0),
  milestonesTotal: integer("milestones_total").default(0),
  milestonesCompleted: integer("milestones_completed").default(0),
  mentorAssignedId: varchar("mentor_assigned_id"),
  staffAssignedId: varchar("staff_assigned_id"),
  programId: varchar("program_id"),
  barriersIdentified: text("barriers_identified"),
  supportNeeded: text("support_needed"),
  lastReviewDate: text("last_review_date"),
  nextReviewDate: text("next_review_date"),
  notes: text("notes"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Student Skills table
export const studentSkills = pgTable("student_skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id),
  skillId: varchar("skill_id").notNull(),
  skillName: text("skill_name").notNull(),
  initialAssessmentDate: text("initial_assessment_date"),
  initialProficiencyLevel: text("initial_proficiency_level"),
  currentProficiencyLevel: text("current_proficiency_level"),
  targetProficiencyLevel: text("target_proficiency_level"),
  lastAssessmentDate: text("last_assessment_date"),
  assessmentScore: integer("assessment_score"),
  hoursPracticed: integer("hours_practiced").default(0),
  projectsCompleted: integer("projects_completed").default(0),
  assessedByStaffId: varchar("assessed_by_staff_id"),
  learningStyle: text("learning_style"),
  strengths: text("strengths"),
  areasForImprovement: text("areas_for_improvement"),
  recommendedNextSteps: text("recommended_next_steps"),
  progressNotes: text("progress_notes"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Work Placements table
export const placements = pgTable("placements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id),
  placementType: text("placement_type"),
  employerName: text("employer_name"),
  industry: text("industry"),
  jobTitle: text("job_title"),
  hourlyWage: decimal("hourly_wage", { precision: 10, scale: 2 }),
  hoursPerWeek: integer("hours_per_week"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  isCurrent: boolean("is_current").default(false),
  betterYouthReferral: boolean("better_youth_referral").default(false),
  performanceRating: text("performance_rating"),
  benefitsOffered: boolean("benefits_offered").default(false),
  careerAdvancementOpportunity: boolean("career_advancement_opportunity").default(false),
  supervisorName: text("supervisor_name"),
  supervisorPhone: text("supervisor_phone"),
  supervisorEmail: text("supervisor_email"),
  mentorAtWorkplace: boolean("mentor_at_workplace").default(false),
  skillsMatchTraining: boolean("skills_match_training").default(false),
  placementNotes: text("placement_notes"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Student Outcomes table
export const studentOutcomes = pgTable("student_outcomes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id),
  metricId: varchar("metric_id").notNull(),
  measurementDate: text("measurement_date"),
  measurementPeriod: text("measurement_period"),
  value: integer("value"),
  previousValue: integer("previous_value"),
  targetValue: integer("target_value"),
  targetMet: boolean("target_met").default(false),
  improvementFromBaseline: integer("improvement_from_baseline"),
  percentileRank: integer("percentile_rank"),
  assessedByStaffId: varchar("assessed_by_staff_id"),
  assessmentMethod: text("assessment_method"),
  confidenceLevel: text("confidence_level"),
  supportingEvidence: text("supporting_evidence"),
  contextNotes: text("context_notes"),
  programId: varchar("program_id"),
  cohortId: varchar("cohort_id"),
  followUpRequired: boolean("follow_up_required").default(false),
  interventionRecommended: text("intervention_recommended"),
  dataQualityFlag: text("data_quality_flag"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Mentors table
export const mentors = pgTable("mentors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  email: text("email"),
  phone: text("phone"),
  mentorType: text("mentor_type"),
  industry: text("industry"),
  companyType: text("company_type"),
  roleCategory: text("role_category"),
  yearsExperience: integer("years_experience"),
  skillsOffered: text("skills_offered"),
  availability: text("availability"),
  maxMentees: integer("max_mentees").default(3),
  currentMentees: integer("current_mentees").default(0),
  backgroundCheckStatus: text("background_check_status"),
  trainingCompleted: boolean("training_completed").default(false),
  startDate: text("start_date"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Student Support Requests table
export const supportRequests = pgTable("support_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id),
  requestType: text("request_type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  attachmentUrl: text("attachment_url"),
  attachmentName: text("attachment_name"),
  priority: text("priority").default("normal"),
  status: text("status").default("pending"),
  assignedStaffId: varchar("assigned_staff_id"),
  resolvedAt: timestamp("resolved_at"),
  resolutionNotes: text("resolution_notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Relations
export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  student: one(students, {
    fields: [userRoles.studentId],
    references: [students.id],
  }),
  mentor: one(mentors, {
    fields: [userRoles.mentorId],
    references: [mentors.id],
  }),
}));

export const studentsRelations = relations(students, ({ many, one }) => ({
  user: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
  goals: many(studentGoals),
  skills: many(studentSkills),
  placements: many(placements),
  outcomes: many(studentOutcomes),
}));

export const studentGoalsRelations = relations(studentGoals, ({ one }) => ({
  student: one(students, {
    fields: [studentGoals.studentId],
    references: [students.id],
  }),
}));

export const studentSkillsRelations = relations(studentSkills, ({ one }) => ({
  student: one(students, {
    fields: [studentSkills.studentId],
    references: [students.id],
  }),
}));

export const placementsRelations = relations(placements, ({ one }) => ({
  student: one(students, {
    fields: [placements.studentId],
    references: [students.id],
  }),
}));

export const studentOutcomesRelations = relations(studentOutcomes, ({ one }) => ({
  student: one(students, {
    fields: [studentOutcomes.studentId],
    references: [students.id],
  }),
}));

export const mentorsRelations = relations(mentors, ({ one }) => ({
  user: one(users, {
    fields: [mentors.userId],
    references: [users.id],
  }),
}));

export const supportRequestsRelations = relations(supportRequests, ({ one }) => ({
  student: one(students, {
    fields: [supportRequests.studentId],
    references: [students.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStudentGoalSchema = createInsertSchema(studentGoals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStudentSkillSchema = createInsertSchema(studentSkills).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPlacementSchema = createInsertSchema(placements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStudentOutcomeSchema = createInsertSchema(studentOutcomes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMentorSchema = createInsertSchema(mentors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSupportRequestSchema = createInsertSchema(supportRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof students.$inferSelect;

export type InsertStudentGoal = z.infer<typeof insertStudentGoalSchema>;
export type StudentGoal = typeof studentGoals.$inferSelect;

export type InsertStudentSkill = z.infer<typeof insertStudentSkillSchema>;
export type StudentSkill = typeof studentSkills.$inferSelect;

export type InsertPlacement = z.infer<typeof insertPlacementSchema>;
export type Placement = typeof placements.$inferSelect;

export type InsertStudentOutcome = z.infer<typeof insertStudentOutcomeSchema>;
export type StudentOutcome = typeof studentOutcomes.$inferSelect;

export type InsertMentor = z.infer<typeof insertMentorSchema>;
export type Mentor = typeof mentors.$inferSelect;

export type InsertSupportRequest = z.infer<typeof insertSupportRequestSchema>;
export type SupportRequest = typeof supportRequests.$inferSelect;
