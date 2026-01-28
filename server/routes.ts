import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertStudentSchema,
  insertStudentGoalSchema,
  insertStudentSkillSchema,
  insertPlacementSchema,
  insertStudentOutcomeSchema,
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Student routes
  app.get("/api/students", async (req, res) => {
    try {
      const students = await storage.listStudents();
      res.json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ error: "Failed to fetch students" });
    }
  });

  app.get("/api/students/:id", async (req, res) => {
    try {
      const student = await storage.getStudent(req.params.id);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      console.error("Error fetching student:", error);
      res.status(500).json({ error: "Failed to fetch student" });
    }
  });

  app.post("/api/students", async (req, res) => {
    try {
      const validated = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(validated);
      res.status(201).json(student);
    } catch (error) {
      console.error("Error creating student:", error);
      res.status(400).json({ error: "Invalid student data" });
    }
  });

  // Student goals routes
  app.get("/api/students/:studentId/goals", async (req, res) => {
    try {
      const goals = await storage.getStudentGoals(req.params.studentId);
      res.json(goals);
    } catch (error) {
      console.error("Error fetching student goals:", error);
      res.status(500).json({ error: "Failed to fetch student goals" });
    }
  });

  app.post("/api/students/:studentId/goals", async (req, res) => {
    try {
      const validated = insertStudentGoalSchema.parse({
        ...req.body,
        studentId: req.params.studentId,
      });
      const goal = await storage.createStudentGoal(validated);
      res.status(201).json(goal);
    } catch (error) {
      console.error("Error creating student goal:", error);
      res.status(400).json({ error: "Invalid goal data" });
    }
  });

  app.patch("/api/goals/:id", async (req, res) => {
    try {
      const goal = await storage.updateStudentGoal(req.params.id, req.body);
      if (!goal) {
        return res.status(404).json({ error: "Goal not found" });
      }
      res.json(goal);
    } catch (error) {
      console.error("Error updating student goal:", error);
      res.status(400).json({ error: "Failed to update goal" });
    }
  });

  // Student skills routes
  app.get("/api/students/:studentId/skills", async (req, res) => {
    try {
      const skills = await storage.getStudentSkills(req.params.studentId);
      res.json(skills);
    } catch (error) {
      console.error("Error fetching student skills:", error);
      res.status(500).json({ error: "Failed to fetch student skills" });
    }
  });

  app.post("/api/students/:studentId/skills", async (req, res) => {
    try {
      const validated = insertStudentSkillSchema.parse({
        ...req.body,
        studentId: req.params.studentId,
      });
      const skill = await storage.createStudentSkill(validated);
      res.status(201).json(skill);
    } catch (error) {
      console.error("Error creating student skill:", error);
      res.status(400).json({ error: "Invalid skill data" });
    }
  });

  app.patch("/api/skills/:id", async (req, res) => {
    try {
      const skill = await storage.updateStudentSkill(req.params.id, req.body);
      if (!skill) {
        return res.status(404).json({ error: "Skill not found" });
      }
      res.json(skill);
    } catch (error) {
      console.error("Error updating student skill:", error);
      res.status(400).json({ error: "Failed to update skill" });
    }
  });

  // Placements routes
  app.get("/api/placements", async (req, res) => {
    try {
      const placements = await storage.getAllPlacements();
      res.json(placements);
    } catch (error) {
      console.error("Error fetching all placements:", error);
      res.status(500).json({ error: "Failed to fetch placements" });
    }
  });

  app.get("/api/students/:studentId/placements", async (req, res) => {
    try {
      const placements = await storage.getStudentPlacements(req.params.studentId);
      res.json(placements);
    } catch (error) {
      console.error("Error fetching student placements:", error);
      res.status(500).json({ error: "Failed to fetch student placements" });
    }
  });

  app.post("/api/students/:studentId/placements", async (req, res) => {
    try {
      const validated = insertPlacementSchema.parse({
        ...req.body,
        studentId: req.params.studentId,
      });
      const placement = await storage.createPlacement(validated);
      res.status(201).json(placement);
    } catch (error) {
      console.error("Error creating placement:", error);
      res.status(400).json({ error: "Invalid placement data" });
    }
  });

  app.patch("/api/placements/:id", async (req, res) => {
    try {
      const placement = await storage.updatePlacement(req.params.id, req.body);
      if (!placement) {
        return res.status(404).json({ error: "Placement not found" });
      }
      res.json(placement);
    } catch (error) {
      console.error("Error updating placement:", error);
      res.status(400).json({ error: "Failed to update placement" });
    }
  });

  // Student outcomes routes
  app.get("/api/students/:studentId/outcomes", async (req, res) => {
    try {
      const outcomes = await storage.getStudentOutcomes(req.params.studentId);
      res.json(outcomes);
    } catch (error) {
      console.error("Error fetching student outcomes:", error);
      res.status(500).json({ error: "Failed to fetch student outcomes" });
    }
  });

  app.post("/api/students/:studentId/outcomes", async (req, res) => {
    try {
      const validated = insertStudentOutcomeSchema.parse({
        ...req.body,
        studentId: req.params.studentId,
      });
      const outcome = await storage.createStudentOutcome(validated);
      res.status(201).json(outcome);
    } catch (error) {
      console.error("Error creating student outcome:", error);
      res.status(400).json({ error: "Invalid outcome data" });
    }
  });

  // Student progress timeline
  app.get("/api/students/:studentId/progress", async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const goals = await storage.getStudentGoals(studentId);
      const skills = await storage.getStudentSkills(studentId);
      const placements = await storage.getStudentPlacements(studentId);
      const student = await storage.getStudent(studentId);
      
      // Calculate XP based on completed goals, skills, and placements
      const completedGoals = goals.filter(g => g.status === "Completed").length;
      const completedSkills = skills.filter(s => s.status !== "Active").length;
      const completedPlacements = placements.filter(p => !p.isCurrent).length;
      const totalXp = (completedGoals * 100) + (completedSkills * 75) + (completedPlacements * 150) + (skills.length * 25);
      
      // Calculate level (every 500 XP = 1 level)
      const level = Math.floor(totalXp / 500) + 1;
      
      // Calculate lessons/videos from skills data
      const lessonsCompleted = skills.filter(s => s.projectsCompleted && s.projectsCompleted > 0).length;
      const totalLessons = 52;
      const videosWatched = skills.reduce((sum, s) => sum + (s.hoursPracticed || 0), 0);
      const totalVideos = 156;
      const progressPercent = Math.round((lessonsCompleted / totalLessons) * 100);
      
      // Calculate current streak (days since last activity)
      const allDates = [
        ...goals.map(g => g.lastReviewDate).filter(Boolean),
        ...skills.map(s => s.lastAssessmentDate).filter(Boolean),
      ];
      const currentStreak = allDates.length > 0 ? Math.min(allDates.length, 30) : 0;
      
      // Current week calculation
      const enrollmentDate = student?.enrollmentDate ? new Date(student.enrollmentDate) : new Date();
      const weeksSinceEnrollment = Math.floor((Date.now() - enrollmentDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      const currentWeek = Math.max(1, weeksSinceEnrollment);
      
      // Build recent progress from completed activities
      const recentProgress: Array<{
        lessonId: string;
        week: number;
        audience: string;
        video1Completed: boolean;
        video2Completed: boolean;
        video3Completed: boolean;
        xpEarned: number;
        completedAt: string;
      }> = [];
      
      for (const skill of skills.slice(0, 5)) {
        if (skill.lastAssessmentDate) {
          recentProgress.push({
            lessonId: skill.skillId || skill.id,
            week: Math.floor((new Date(skill.lastAssessmentDate).getTime() - enrollmentDate.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1,
            audience: "core",
            video1Completed: true,
            video2Completed: (skill.projectsCompleted || 0) >= 1,
            video3Completed: (skill.projectsCompleted || 0) >= 2,
            xpEarned: (skill.assessmentScore || 50) + 25,
            completedAt: skill.lastAssessmentDate,
          });
        }
      }

      // Build waterfall timeline (enrollment, goals, skills, placements)
      const timeline: Array<{
        id: string;
        date: string;
        title: string;
        description: string;
        type: "enrollment" | "goal" | "skill" | "placement" | "milestone";
        status: "completed" | "in_progress" | "upcoming";
      }> = [];

      if (student && student.enrollmentDate) {
        timeline.push({
          id: `enroll-${studentId}`,
          date: student.enrollmentDate,
          title: "Enrolled in Better Youth",
          description: `Started journey as ${student.ageRange || "youth"} student`,
          type: "enrollment",
          status: "completed",
        });
      }

      for (const goal of goals) {
        if (goal.startDate) {
          timeline.push({
            id: `goal-${goal.id}`,
            date: goal.startDate,
            title: goal.goalTitle || "Goal",
            description: `${goal.goalType || "General"} goal • ${goal.progressPercentage || 0}% complete`,
            type: "goal",
            status: goal.status === "Completed" ? "completed" : goal.status === "On Track" ? "in_progress" : "upcoming",
          });
        }
      }

      for (const skill of skills) {
        if (skill.initialAssessmentDate) {
          timeline.push({
            id: `skill-${skill.id}`,
            date: skill.initialAssessmentDate,
            title: `Skill Assessment: ${skill.skillName || "Skill"}`,
            description: `${skill.initialProficiencyLevel || "Start"} → ${skill.currentProficiencyLevel || "Current"}`,
            type: "skill",
            status: skill.status === "Active" ? "in_progress" : "completed",
          });
        }
      }

      for (const placement of placements) {
        if (placement.startDate) {
          timeline.push({
            id: `placement-${placement.id}`,
            date: placement.startDate,
            title: `${placement.jobTitle || "Position"} at ${placement.employerName || "Employer"}`,
            description: `${placement.placementType || "Placement"} • ${placement.industry || "Industry"}`,
            type: "placement",
            status: placement.isCurrent ? "in_progress" : "completed",
          });
        }
      }

      timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      res.json({
        user: {
          id: studentId,
          displayName: student?.email?.split("@")[0] || "Student",
          role: "student",
          level,
          totalXp,
          currentStreak,
        },
        lessonsCompleted,
        totalLessons,
        videosWatched,
        totalVideos,
        progressPercent,
        currentWeek,
        recentProgress,
        timeline,
        achievements: [],
      });
    } catch (error) {
      console.error("Error fetching student progress:", error);
      res.status(500).json({ error: "Failed to fetch student progress" });
    }
  });

  // Mentors routes
  app.get("/api/mentors", async (req, res) => {
    try {
      const mentors = await storage.listMentors();
      res.json(mentors);
    } catch (error) {
      console.error("Error fetching mentors:", error);
      res.status(500).json({ error: "Failed to fetch mentors" });
    }
  });

  app.get("/api/mentors/:id", async (req, res) => {
    try {
      const mentor = await storage.getMentor(req.params.id);
      if (!mentor) {
        return res.status(404).json({ error: "Mentor not found" });
      }
      res.json(mentor);
    } catch (error) {
      console.error("Error fetching mentor:", error);
      res.status(500).json({ error: "Failed to fetch mentor" });
    }
  });

  return httpServer;
}
