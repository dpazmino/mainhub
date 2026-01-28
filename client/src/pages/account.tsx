import * as React from "react";
import { Link } from "wouter";
import { ArrowLeft, User } from "lucide-react";

import { getStudents, getStudentGoals, getStudentSkills, getStudentPlacements } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type StudentProfile = {
  student_id: string;
  age_range: string;
  enrollment_date: string;
  grade_level: string;
  school_type: string;
  primary_language: string;
  transportation_needs: boolean;
  has_iep: boolean;
  photo_consent: boolean;
  status: string;
};

type StudentGoal = {
  goal_id: string;
  goal_type: string;
  goal_title: string;
  progress_percentage: number;
  status: string;
  priority: string;
  target_completion_date: string;
};

type StudentSkill = {
  skill_id: string;
  skill_name: string;
  current_proficiency_level: string;
  target_proficiency_level: string;
  assessment_score: number;
  hours_practiced: number;
  projects_completed: number;
  learning_style: string;
  status: string;
};

export default function AccountPage() {
  const [dataState, setDataState] = React.useState<
    | { status: "loading" }
    | {
        status: "ready";
        student: StudentProfile;
        goals: StudentGoal[];
        skills: StudentSkill[];
      }
    | { status: "error"; message: string }
  >({ status: "loading" });

  React.useEffect(() => {
    let mounted = true;

    getStudents()
      .then(async (students) => {
        if (!mounted) return;

        const selectedStudent = students[0];
        if (!selectedStudent) {
          setDataState({ status: "error", message: "No student profile found" });
          return;
        }

        const [goals, skills] = await Promise.all([
          getStudentGoals(selectedStudent.id),
          getStudentSkills(selectedStudent.id),
        ]);

        const studentGoals = goals.map((g) => ({
          goal_id: g.id,
          goal_type: g.goalType,
          goal_title: g.goalTitle,
          progress_percentage: g.progressPercentage || 0,
          status: g.status || "active",
          priority: g.priority || "medium",
          target_completion_date: g.targetCompletionDate || "",
        }));

        const studentSkills = skills.map((sk) => ({
          skill_id: sk.id,
          skill_name: sk.skillName || sk.skillId || "Unknown",
          current_proficiency_level: sk.currentProficiencyLevel || "",
          target_proficiency_level: sk.targetProficiencyLevel || "",
          assessment_score: sk.assessmentScore || 0,
          hours_practiced: sk.hoursPracticed || 0,
          projects_completed: sk.projectsCompleted || 0,
          learning_style: sk.learningStyle || "",
          status: sk.status || "active",
        }));

        setDataState({
          status: "ready",
          student: {
            student_id: selectedStudent.id,
            age_range: selectedStudent.ageRange || "—",
            enrollment_date: selectedStudent.enrollmentDate || "—",
            grade_level: selectedStudent.gradeLevel || "—",
            school_type: selectedStudent.schoolType || "—",
            primary_language: selectedStudent.primaryLanguage || "—",
            transportation_needs: selectedStudent.transportationNeeds || false,
            has_iep: selectedStudent.hasIep || false,
            photo_consent: selectedStudent.photoConsent || false,
            status: selectedStudent.status || "—",
          },
          goals: studentGoals,
          skills: studentSkills,
        });
      })
      .catch((e) => {
        if (!mounted) return;
        setDataState({
          status: "error",
          message: e instanceof Error ? e.message : "Failed to load profile",
        });
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (dataState.status === "loading") {
    return (
      <div className="min-h-screen by-noise">
        <div className="absolute inset-0 by-shimmer" />
        <div className="absolute inset-0 by-grid opacity-[0.55]" />
        <div className="relative mx-auto w-full max-w-4xl px-5 md:px-8 py-10">
          <div className="text-center text-muted-foreground">Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (dataState.status === "error") {
    return (
      <div className="min-h-screen by-noise">
        <div className="absolute inset-0 by-shimmer" />
        <div className="absolute inset-0 by-grid opacity-[0.55]" />
        <div className="relative mx-auto w-full max-w-4xl px-5 md:px-8 py-10">
          <div className="text-center text-destructive">{dataState.message}</div>
          <div className="mt-4 text-center">
            <Link href="/">
              <Button variant="secondary">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const s = dataState.student;
  const goals = dataState.goals;
  const skills = dataState.skills;

  return (
    <div className="min-h-screen by-noise">
      <div className="absolute inset-0 by-shimmer" />
      <div className="absolute inset-0 by-grid opacity-[0.55]" />

      <div className="relative mx-auto w-full max-w-4xl px-5 md:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[hsl(var(--primary)/0.12)] p-2.5">
              <User className="h-5 w-5 text-[hsl(var(--primary))]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold" data-testid="text-account-title">
                Your Profile
              </h1>
              <div className="text-sm text-muted-foreground" data-testid="text-account-subtitle">
                Student ID: {s.student_id}
              </div>
            </div>
          </div>
          <Link href="/">
            <Button variant="secondary" className="rounded-full gap-2" data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
            <CardHeader className="pb-2">
              <div className="text-sm font-medium" data-testid="text-profile-basics-title">
                Profile Details
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="rounded-2xl border border-border bg-white/60 p-4" data-testid="card-profile-basics">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Grade level</div>
                    <div className="mt-1 text-sm font-medium">{s.grade_level}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Age range</div>
                    <div className="mt-1 text-sm font-medium">{s.age_range}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">School type</div>
                    <div className="mt-1 text-sm font-medium">{s.school_type}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Language</div>
                    <div className="mt-1 text-sm font-medium">{s.primary_language}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2" data-testid="row-profile-flags">
                <Badge variant="secondary" className="rounded-full bg-white/70 border border-border">
                  Status: {s.status}
                </Badge>
                <Badge variant="secondary" className="rounded-full bg-white/70 border border-border">
                  Transport: {s.transportation_needs ? "Needs" : "No"}
                </Badge>
                <Badge variant="secondary" className="rounded-full bg-white/70 border border-border">
                  IEP: {s.has_iep ? "Yes" : "No"}
                </Badge>
                <Badge variant="secondary" className="rounded-full bg-white/70 border border-border">
                  Photo consent: {s.photo_consent ? "Yes" : "No"}
                </Badge>
              </div>

              <div className="rounded-2xl border border-border bg-white/50 p-3">
                <div className="text-xs text-muted-foreground">Enrollment date</div>
                <div className="mt-1 text-sm font-medium">{s.enrollment_date}</div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
              <CardHeader className="pb-2">
                <div className="text-sm font-medium">Goals</div>
                <div className="text-sm text-muted-foreground">Your current objectives</div>
              </CardHeader>
              <CardContent className="grid gap-3">
                {goals.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No goals set yet.</div>
                ) : (
                  goals.slice(0, 3).map((g) => (
                    <div key={g.goal_id} className="rounded-2xl border border-border bg-white/60 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">{g.goal_title}</div>
                        <Badge variant="secondary" className="rounded-full text-xs">
                          {g.goal_type}
                        </Badge>
                      </div>
                      <Progress value={g.progress_percentage} className="h-2" />
                      <div className="mt-1 text-xs text-muted-foreground">
                        {g.progress_percentage}% complete
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
              <CardHeader className="pb-2">
                <div className="text-sm font-medium">Skills</div>
                <div className="text-sm text-muted-foreground">Your skill assessments</div>
              </CardHeader>
              <CardContent className="grid gap-3">
                {skills.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No skills assessed yet.</div>
                ) : (
                  skills.slice(0, 3).map((sk) => (
                    <div key={sk.skill_id} className="rounded-2xl border border-border bg-white/60 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">{sk.skill_name}</div>
                        <Badge variant="secondary" className="rounded-full text-xs">
                          {sk.current_proficiency_level}
                        </Badge>
                      </div>
                      <Progress value={sk.assessment_score} className="h-2" />
                      <div className="mt-1 text-xs text-muted-foreground">
                        Score: {sk.assessment_score}% | {sk.hours_practiced}h practiced
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
