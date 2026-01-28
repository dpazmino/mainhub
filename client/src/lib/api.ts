import type {
  Student,
  StudentGoal,
  StudentSkill,
  Placement,
  StudentOutcome,
  Mentor,
} from "@shared/schema";

const API_BASE = "/api";

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

// Students
export async function getStudents(): Promise<Student[]> {
  return fetchJson<Student[]>("/students");
}

export async function getStudent(id: string): Promise<Student> {
  return fetchJson<Student>(`/students/${id}`);
}

// Student Goals
export async function getStudentGoals(studentId: string): Promise<StudentGoal[]> {
  return fetchJson<StudentGoal[]>(`/students/${studentId}/goals`);
}

export async function createStudentGoal(studentId: string, goal: Partial<StudentGoal>): Promise<StudentGoal> {
  return fetchJson<StudentGoal>(`/students/${studentId}/goals`, {
    method: "POST",
    body: JSON.stringify(goal),
  });
}

export async function updateStudentGoal(id: string, updates: Partial<StudentGoal>): Promise<StudentGoal> {
  return fetchJson<StudentGoal>(`/goals/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

// Student Skills
export async function getStudentSkills(studentId: string): Promise<StudentSkill[]> {
  return fetchJson<StudentSkill[]>(`/students/${studentId}/skills`);
}

export async function createStudentSkill(studentId: string, skill: Partial<StudentSkill>): Promise<StudentSkill> {
  return fetchJson<StudentSkill>(`/students/${studentId}/skills`, {
    method: "POST",
    body: JSON.stringify(skill),
  });
}

export async function updateStudentSkill(id: string, updates: Partial<StudentSkill>): Promise<StudentSkill> {
  return fetchJson<StudentSkill>(`/skills/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

// Placements
export async function getAllPlacements(): Promise<Placement[]> {
  return fetchJson<Placement[]>(`/placements`);
}

export async function getStudentPlacements(studentId: string): Promise<Placement[]> {
  return fetchJson<Placement[]>(`/students/${studentId}/placements`);
}

export async function createPlacement(studentId: string, placement: Partial<Placement>): Promise<Placement> {
  return fetchJson<Placement>(`/students/${studentId}/placements`, {
    method: "POST",
    body: JSON.stringify(placement),
  });
}

export async function updatePlacement(id: string, updates: Partial<Placement>): Promise<Placement> {
  return fetchJson<Placement>(`/placements/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

// Student Outcomes
export async function getStudentOutcomes(studentId: string): Promise<StudentOutcome[]> {
  return fetchJson<StudentOutcome[]>(`/students/${studentId}/outcomes`);
}

// Mentors
export async function getMentors(): Promise<Mentor[]> {
  return fetchJson<Mentor[]>("/mentors");
}

export async function getMentor(id: string): Promise<Mentor> {
  return fetchJson<Mentor>(`/mentors/${id}`);
}
