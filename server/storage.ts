import {
  users,
  students,
  studentGoals,
  studentSkills,
  placements,
  studentOutcomes,
  mentors,
  supportRequests,
  devices,
  deviceAllocations,
  type User,
  type Student,
  type StudentGoal,
  type StudentSkill,
  type Placement,
  type StudentOutcome,
  type Mentor,
  type SupportRequest,
  type Device,
  type DeviceAllocation,
  type InsertUser,
  type InsertStudent,
  type InsertStudentGoal,
  type InsertStudentSkill,
  type InsertPlacement,
  type InsertStudentOutcome,
  type InsertMentor,
  type InsertSupportRequest,
  type InsertDeviceAllocation,
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Student operations
  getStudent(id: string): Promise<Student | undefined>;
  getStudentByUserId(userId: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  listStudents(): Promise<Student[]>;

  // Student goals
  getStudentGoals(studentId: string): Promise<StudentGoal[]>;
  createStudentGoal(goal: InsertStudentGoal): Promise<StudentGoal>;
  updateStudentGoal(id: string, updates: Partial<InsertStudentGoal>): Promise<StudentGoal | undefined>;

  // Student skills
  getStudentSkills(studentId: string): Promise<StudentSkill[]>;
  createStudentSkill(skill: InsertStudentSkill): Promise<StudentSkill>;
  updateStudentSkill(id: string, updates: Partial<InsertStudentSkill>): Promise<StudentSkill | undefined>;

  // Placements
  getAllPlacements(): Promise<Placement[]>;
  getStudentPlacements(studentId: string): Promise<Placement[]>;
  createPlacement(placement: InsertPlacement): Promise<Placement>;
  updatePlacement(id: string, updates: Partial<InsertPlacement>): Promise<Placement | undefined>;

  // Student outcomes
  getStudentOutcomes(studentId: string): Promise<StudentOutcome[]>;
  createStudentOutcome(outcome: InsertStudentOutcome): Promise<StudentOutcome>;

  // Mentor operations
  getMentor(id: string): Promise<Mentor | undefined>;
  getMentorByUserId(userId: string): Promise<Mentor | undefined>;
  createMentor(mentor: InsertMentor): Promise<Mentor>;
  listMentors(): Promise<Mentor[]>;

  // Support requests
  getSupportRequests(): Promise<SupportRequest[]>;
  getStudentSupportRequests(studentId: string): Promise<SupportRequest[]>;
  createSupportRequest(request: InsertSupportRequest): Promise<SupportRequest>;
  updateSupportRequest(id: string, updates: Partial<InsertSupportRequest>): Promise<SupportRequest | undefined>;

  // Device operations
  listDevices(): Promise<Device[]>;
  getDevice(id: string): Promise<Device | undefined>;

  // Device allocation operations
  listDeviceAllocations(): Promise<DeviceAllocation[]>;
  getDeviceAllocation(id: string): Promise<DeviceAllocation | undefined>;
  updateDeviceAllocation(id: string, updates: Partial<InsertDeviceAllocation>): Promise<DeviceAllocation | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Student operations
  async getStudent(id: string): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student || undefined;
  }

  async getStudentByUserId(userId: string): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.userId, userId));
    return student || undefined;
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const [student] = await db.insert(students).values(insertStudent).returning();
    return student;
  }

  async listStudents(): Promise<Student[]> {
    return db.select().from(students);
  }

  // Student goals
  async getStudentGoals(studentId: string): Promise<StudentGoal[]> {
    return db.select().from(studentGoals).where(eq(studentGoals.studentId, studentId));
  }

  async createStudentGoal(insertGoal: InsertStudentGoal): Promise<StudentGoal> {
    const [goal] = await db.insert(studentGoals).values(insertGoal).returning();
    return goal;
  }

  async updateStudentGoal(id: string, updates: Partial<InsertStudentGoal>): Promise<StudentGoal | undefined> {
    const [goal] = await db
      .update(studentGoals)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(studentGoals.id, id))
      .returning();
    return goal || undefined;
  }

  // Student skills
  async getStudentSkills(studentId: string): Promise<StudentSkill[]> {
    return db.select().from(studentSkills).where(eq(studentSkills.studentId, studentId));
  }

  async createStudentSkill(insertSkill: InsertStudentSkill): Promise<StudentSkill> {
    const [skill] = await db.insert(studentSkills).values(insertSkill).returning();
    return skill;
  }

  async updateStudentSkill(id: string, updates: Partial<InsertStudentSkill>): Promise<StudentSkill | undefined> {
    const [skill] = await db
      .update(studentSkills)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(studentSkills.id, id))
      .returning();
    return skill || undefined;
  }

  // Placements
  async getAllPlacements(): Promise<Placement[]> {
    return db.select().from(placements);
  }

  async getStudentPlacements(studentId: string): Promise<Placement[]> {
    return db.select().from(placements).where(eq(placements.studentId, studentId));
  }

  async createPlacement(insertPlacement: InsertPlacement): Promise<Placement> {
    const [placement] = await db.insert(placements).values(insertPlacement).returning();
    return placement;
  }

  async updatePlacement(id: string, updates: Partial<InsertPlacement>): Promise<Placement | undefined> {
    const [placement] = await db
      .update(placements)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(placements.id, id))
      .returning();
    return placement || undefined;
  }

  // Student outcomes
  async getStudentOutcomes(studentId: string): Promise<StudentOutcome[]> {
    return db.select().from(studentOutcomes).where(eq(studentOutcomes.studentId, studentId));
  }

  async createStudentOutcome(insertOutcome: InsertStudentOutcome): Promise<StudentOutcome> {
    const [outcome] = await db.insert(studentOutcomes).values(insertOutcome).returning();
    return outcome;
  }

  // Mentor operations
  async getMentor(id: string): Promise<Mentor | undefined> {
    const [mentor] = await db.select().from(mentors).where(eq(mentors.id, id));
    return mentor || undefined;
  }

  async getMentorByUserId(userId: string): Promise<Mentor | undefined> {
    const [mentor] = await db.select().from(mentors).where(eq(mentors.userId, userId));
    return mentor || undefined;
  }

  async createMentor(insertMentor: InsertMentor): Promise<Mentor> {
    const [mentor] = await db.insert(mentors).values(insertMentor).returning();
    return mentor;
  }

  async listMentors(): Promise<Mentor[]> {
    return db.select().from(mentors);
  }

  // Support requests
  async getSupportRequests(): Promise<SupportRequest[]> {
    return db.select().from(supportRequests);
  }

  async getStudentSupportRequests(studentId: string): Promise<SupportRequest[]> {
    return db.select().from(supportRequests).where(eq(supportRequests.studentId, studentId));
  }

  async createSupportRequest(insertRequest: InsertSupportRequest): Promise<SupportRequest> {
    const [request] = await db.insert(supportRequests).values(insertRequest).returning();
    return request;
  }

  async updateSupportRequest(id: string, updates: Partial<InsertSupportRequest>): Promise<SupportRequest | undefined> {
    const [request] = await db
      .update(supportRequests)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(supportRequests.id, id))
      .returning();
    return request || undefined;
  }

  // Device operations
  async listDevices(): Promise<Device[]> {
    return db.select().from(devices);
  }

  async getDevice(id: string): Promise<Device | undefined> {
    const [device] = await db.select().from(devices).where(eq(devices.id, id));
    return device || undefined;
  }

  // Device allocation operations
  async listDeviceAllocations(): Promise<DeviceAllocation[]> {
    return db.select().from(deviceAllocations);
  }

  async getDeviceAllocation(id: string): Promise<DeviceAllocation | undefined> {
    const [allocation] = await db.select().from(deviceAllocations).where(eq(deviceAllocations.id, id));
    return allocation || undefined;
  }

  async updateDeviceAllocation(id: string, updates: Partial<InsertDeviceAllocation>): Promise<DeviceAllocation | undefined> {
    const [allocation] = await db
      .update(deviceAllocations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(deviceAllocations.id, id))
      .returning();
    return allocation || undefined;
  }
}

export const storage = new DatabaseStorage();
