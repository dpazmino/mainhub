import * as React from "react";
import { Link, useLocation, useSearch } from "wouter";
import {
  BadgeCheck,
  BookOpen,
  Briefcase,
  ClipboardList,
  GraduationCap,
  Handshake,
  Laptop,
  LineChart,
  Search,
  Settings2,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

import { getStudents, getStudentGoals, getStudentSkills, getStudentPlacements, getMentors, getAllPlacements } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RoleKey = "student" | "staff" | "experience";

function RolePill({ label }: { label: string }) {
  return (
    <Badge
      variant="secondary"
      className="rounded-full bg-white/70 border border-border"
      data-testid={`badge-role-pill-${label.toLowerCase().replaceAll(/\s+/g, "-")}`}
    >
      {label}
    </Badge>
  );
}

function RoleHeader({ role }: { role: RoleKey }) {
  const roleMeta: Record<
    RoleKey,
    { title: string; subtitle: string; icon: React.ReactNode; accents: string[] }
  > = {
    student: {
      title: "Student Dashboard",
      subtitle: "Assess, learn, and track progress—with support signals built in.",
      icon: <GraduationCap className="h-5 w-5" strokeWidth={2} />,
      accents: ["Learning access", "Assessments", "Progress"],
    },
    staff: {
      title: "Staff & Admin Dashboard",
      subtitle: "Operate programs, manage devices, and measure outcomes end-to-end.",
      icon: <Shield className="h-5 w-5" strokeWidth={2} />,
      accents: ["CRM", "Device management", "KPI analytics"],
    },
    experience: {
      title: "Experience Journey Dashboard",
      subtitle: "Mentors, partners, and alumni—engagement that drives workforce outcomes.",
      icon: <Handshake className="h-5 w-5" strokeWidth={2} />,
      accents: ["Mentors", "Partnerships", "Alumni"],
    },
  };

  const m = roleMeta[role];

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="flex items-start gap-3">
        <div
          className="grid h-11 w-11 place-items-center rounded-2xl border border-border bg-white/70 shadow-sm"
          data-testid="img-role-header-icon"
        >
          {m.icon}
        </div>
        <div>
          <div className="text-sm text-muted-foreground" data-testid="text-role-header-kicker">
            Better Youth Hub
          </div>
          <h1
            className="font-serif text-3xl md:text-4xl tracking-tight"
            data-testid="text-role-header-title"
          >
            {m.title}
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground" data-testid="text-role-header-subtitle">
            {m.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {m.accents.map((a) => (
          <RolePill key={a} label={a} />
        ))}
      </div>
    </div>
  );
}

interface StudentLookupResult {
  id: number;
  studentId: string;
  ageRange: string;
  enrollmentDate: string;
  gradeLevel: string;
  schoolType: string;
  primaryLanguage: string;
  transportationNeeds: boolean;
  hasIep: boolean;
  photoConsent: boolean;
  status: string;
}

function LookupStudentSection({ students, isLoading }: { students: StudentLookupResult[]; isLoading: boolean }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStudent, setSelectedStudent] = React.useState<StudentLookupResult | null>(null);

  const filteredStudents = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        s.studentId.toLowerCase().includes(query) ||
        s.gradeLevel.toLowerCase().includes(query) ||
        s.schoolType.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  const handleStudentSelect = (student: StudentLookupResult) => {
    setSelectedStudent(student);
  };

  const handleKeyDown = (e: React.KeyboardEvent, student: StudentLookupResult) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleStudentSelect(student);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold" data-testid="text-lookup-title">
            Student Lookup
          </h2>
          <p className="text-sm text-muted-foreground" data-testid="text-lookup-description">
            Loading student data...
          </p>
        </div>
        <Card className="rounded-2xl bg-white/70 border-border/70">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground" data-testid="text-loading">
              Loading students...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold" data-testid="text-lookup-title">
          Student Lookup
        </h2>
        <p className="text-sm text-muted-foreground" data-testid="text-lookup-description">
          Search for students by ID, grade level, or school type
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Enter student ID or search term..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedStudent(null);
          }}
          className="pl-10 rounded-xl"
          data-testid="input-student-search"
        />
      </div>

      {searchQuery.trim() && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground" data-testid="text-search-results-count">
            {filteredStudents.length} result{filteredStudents.length !== 1 ? "s" : ""} found
          </p>

          {filteredStudents.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3" role="listbox" aria-label="Student search results">
              {filteredStudents.slice(0, 12).map((student) => (
                <div
                  key={student.id}
                  role="option"
                  aria-selected={selectedStudent?.id === student.id}
                  tabIndex={0}
                  className={`rounded-2xl cursor-pointer transition-all hover:shadow-md border p-4 ${
                    selectedStudent?.id === student.id
                      ? "ring-2 ring-primary bg-primary/5 border-primary/30"
                      : "bg-white/70 border-border/70"
                  }`}
                  onClick={() => handleStudentSelect(student)}
                  onKeyDown={(e) => handleKeyDown(e, student)}
                  data-testid={`card-student-result-${student.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium" data-testid={`text-student-id-${student.id}`}>
                        {student.studentId}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {student.gradeLevel} · {student.schoolType}
                      </div>
                    </div>
                    <Badge
                      variant={student.status.toLowerCase() === "active" ? "default" : "secondary"}
                      className="text-xs"
                      data-testid={`badge-student-status-${student.id}`}
                    >
                      {student.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredStudents.length === 0 && (
            <Card className="rounded-2xl bg-white/70 border-border/70">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground" data-testid="text-no-results">
                  No students found matching "{searchQuery}"
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {selectedStudent && (
        <Card className="rounded-2xl bg-white/70 border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <h3 className="text-base font-semibold" data-testid="text-selected-student-title">
              Student Details
            </h3>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="text-xs text-muted-foreground">Student ID</div>
                <div className="font-medium" data-testid="text-detail-student-id">
                  {selectedStudent.studentId}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Age Range</div>
                <div className="font-medium" data-testid="text-detail-age-range">
                  {selectedStudent.ageRange}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Grade Level</div>
                <div className="font-medium" data-testid="text-detail-grade-level">
                  {selectedStudent.gradeLevel}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">School Type</div>
                <div className="font-medium" data-testid="text-detail-school-type">
                  {selectedStudent.schoolType}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Enrollment Date</div>
                <div className="font-medium" data-testid="text-detail-enrollment-date">
                  {selectedStudent.enrollmentDate}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Primary Language</div>
                <div className="font-medium" data-testid="text-detail-primary-language">
                  {selectedStudent.primaryLanguage}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Transportation Needs</div>
                <div className="font-medium" data-testid="text-detail-transportation">
                  {selectedStudent.transportationNeeds ? "Yes" : "No"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Has IEP</div>
                <div className="font-medium" data-testid="text-detail-iep">
                  {selectedStudent.hasIep ? "Yes" : "No"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Photo Consent</div>
                <div className="font-medium" data-testid="text-detail-photo-consent">
                  {selectedStudent.photoConsent ? "Yes" : "No"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Status</div>
                <Badge
                  variant={selectedStudent.status.toLowerCase() === "active" ? "default" : "secondary"}
                  data-testid="text-detail-status"
                >
                  {selectedStudent.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function QuickActions({ role }: { role: RoleKey }) {
  const actions: Record<RoleKey, { label: string; icon: React.ReactNode }[]> = {
    student: [
      { label: "Take skill check", icon: <ClipboardList className="h-4 w-4" /> },
      { label: "View learning path", icon: <BookOpen className="h-4 w-4" /> },
      { label: "Update support needs", icon: <Users className="h-4 w-4" /> },
    ],
    staff: [
      { label: "Open CRM", icon: <Users className="h-4 w-4" /> },
      { label: "Device management", icon: <Laptop className="h-4 w-4" /> },
      { label: "KPI snapshot", icon: <LineChart className="h-4 w-4" /> },
    ],
    experience: [
      { label: "Mentor sessions", icon: <Handshake className="h-4 w-4" /> },
      { label: "Alumni journey", icon: <BadgeCheck className="h-4 w-4" /> },
      { label: "Partner workspace", icon: <Settings2 className="h-4 w-4" /> },
    ],
  };

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {actions[role].map((a, idx) => (
        <Button
          key={a.label}
          variant="secondary"
          className="justify-start gap-2 rounded-2xl bg-white/70 border border-border hover:bg-white"
          data-testid={`button-quick-action-${role}-${idx}`}
        >
          {a.icon}
          <span>{a.label}</span>
        </Button>
      ))}
    </div>
  );
}

function StudentPanel({
  datasetState,
}: {
  datasetState:
    | { status: "loading" }
    | {
        status: "ready";
        kpis: {
          activePlacements: number;
          completedPlacements: number;
          activeStudents: number;
          mentorsActive: number;
          avgHourlyWageActive: number;
        };
        selectedStudent: {
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
        studentGoals: {
          goal_id: string;
          goal_type: string;
          goal_title: string;
          progress_percentage: number;
          status: string;
          priority: string;
          target_completion_date: string;
        }[];
        studentSkills: {
          student_skill_id: string;
          skill_id: string;
          current_proficiency_level: string;
          target_proficiency_level: string;
          assessment_score: number;
          hours_practiced: number;
          projects_completed: number;
          learning_style: string;
          status: string;
        }[];
        studentPlacements: {
          placement_id: string;
          placement_type: string;
          employer_name: string;
          industry: string;
          job_title: string;
          hourly_wage: number;
          hours_per_week: number;
          is_current: boolean;
          better_youth_referral: boolean;
          performance_rating: string;
          status: string;
        }[];
      }
    | { status: "error"; message: string };
}) {
  if (datasetState.status === "error") {
    return (
      <div
        className="rounded-3xl border border-border bg-white/70 p-5 text-sm text-muted-foreground"
        data-testid="status-student-dataset-error"
      >
        Couldn’t load student data: {datasetState.message}
      </div>
    );
  }

  if (datasetState.status !== "ready") {
    return (
      <div className="grid gap-4 lg:grid-cols-3" data-testid="status-student-dataset-loading">
        <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground" data-testid="text-student-loading-1">
              Loading student profile…
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground" data-testid="text-student-loading-2">
              Loading goals & skills…
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground" data-testid="text-student-loading-3">
              Loading placements…
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const s = datasetState.selectedStudent;

  const goals = datasetState.studentGoals;
  const topGoal = goals
    .slice()
    .sort((a, b) => (b.progress_percentage ?? 0) - (a.progress_percentage ?? 0))[0];

  const skills = datasetState.studentSkills;
  const topSkill = skills
    .slice()
    .sort((a, b) => (b.assessment_score ?? 0) - (a.assessment_score ?? 0))[0];

  const placements = datasetState.studentPlacements;
  const currentPlacement = placements.find((p) => p.is_current) ?? placements[0];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <div className="text-sm font-medium" data-testid="text-student-goals-title">
            Goals & progress
          </div>
          <div className="text-sm text-muted-foreground" data-testid="text-student-goals-subtitle">
            What you’re working toward right now.
          </div>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-student-top-goal">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" data-testid="text-student-top-goal-title">
                  {topGoal ? topGoal.goal_title : "No goals found"}
                </div>
                <div className="mt-1 text-xs text-muted-foreground" data-testid="text-student-top-goal-meta">
                  {topGoal ? `${topGoal.goal_type} • ${topGoal.status} • Priority: ${topGoal.priority}` : "—"}
                </div>
              </div>
              <Badge
                variant="secondary"
                className="rounded-full"
                data-testid="badge-student-top-goal-progress"
              >
                {topGoal ? `${topGoal.progress_percentage}%` : "—"}
              </Badge>
            </div>
            <div className="mt-3">
              <Progress value={topGoal ? topGoal.progress_percentage : 0} data-testid="progress-student-top-goal" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-student-skills">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium" data-testid="text-student-top-skill-title">
                  {topSkill ? `Skill ${topSkill.skill_id}` : "Skills"}
                </div>
                <div className="mt-1 text-xs text-muted-foreground" data-testid="text-student-top-skill-meta">
                  {topSkill
                    ? `${topSkill.current_proficiency_level} → ${topSkill.target_proficiency_level} • ${topSkill.learning_style}`
                    : "No skills found"}
                </div>
              </div>
              <Badge variant="secondary" className="rounded-full" data-testid="badge-student-top-skill-score">
                {topSkill ? `${topSkill.assessment_score}` : "—"}
              </Badge>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2" data-testid="grid-student-skill-stats">
              <div className="rounded-2xl border border-border bg-white/60 p-2" data-testid="card-student-hours">
                <div className="text-[11px] text-muted-foreground" data-testid="text-student-hours-label">
                  Hours practiced
                </div>
                <div className="mt-1 text-sm font-medium" data-testid="text-student-hours-value">
                  {topSkill ? topSkill.hours_practiced : "—"}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-white/60 p-2" data-testid="card-student-projects">
                <div className="text-[11px] text-muted-foreground" data-testid="text-student-projects-label">
                  Projects
                </div>
                <div className="mt-1 text-sm font-medium" data-testid="text-student-projects-value">
                  {topSkill ? topSkill.projects_completed : "—"}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-white/60 p-2" data-testid="card-student-skill-status">
                <div className="text-[11px] text-muted-foreground" data-testid="text-student-skill-status-label">
                  Skill status
                </div>
                <div className="mt-1 text-sm font-medium" data-testid="text-student-skill-status-value">
                  {topSkill ? topSkill.status : "—"}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white/50 p-3" data-testid="card-student-goals-count">
            <div className="text-xs text-muted-foreground" data-testid="text-student-goals-count-label">
              Goals in your plan
            </div>
            <div className="mt-1 text-sm font-medium" data-testid="text-student-goals-count-value">
              {goals.length}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <div className="text-sm font-medium" data-testid="text-student-placement-title">
            Work placement
          </div>
          <div className="text-sm text-muted-foreground" data-testid="text-student-placement-subtitle">
            Your current or most recent placement.
          </div>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-student-placement">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" data-testid="text-student-placement-job">
                  {currentPlacement ? currentPlacement.job_title : "No placement found"}
                </div>
                <div className="mt-1 text-xs text-muted-foreground" data-testid="text-student-placement-org">
                  {currentPlacement ? `${currentPlacement.employer_name} • ${currentPlacement.industry}` : "—"}
                </div>
              </div>
              <Badge variant="secondary" className="rounded-full" data-testid="badge-student-placement-status">
                {currentPlacement ? currentPlacement.status : "—"}
              </Badge>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3" data-testid="grid-student-placement-stats">
              <div>
                <div className="text-xs text-muted-foreground" data-testid="text-student-wage-label">
                  Wage
                </div>
                <div className="mt-1 text-sm font-medium" data-testid="text-student-wage-value">
                  {currentPlacement ? `$${currentPlacement.hourly_wage.toFixed(2)}/hr` : "—"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground" data-testid="text-student-hours-label">
                  Hours/week
                </div>
                <div className="mt-1 text-sm font-medium" data-testid="text-student-hours-week-value">
                  {currentPlacement ? currentPlacement.hours_per_week : "—"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground" data-testid="text-student-referral-label">
                  Better Youth referral
                </div>
                <div className="mt-1 text-sm font-medium" data-testid="text-student-referral-value">
                  {currentPlacement ? (currentPlacement.better_youth_referral ? "Yes" : "No") : "—"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground" data-testid="text-student-performance-label">
                  Performance rating
                </div>
                <div className="mt-1 text-sm font-medium" data-testid="text-student-performance-value">
                  {currentPlacement ? currentPlacement.performance_rating : "—"}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white/50 p-3" data-testid="card-student-placements-count">
            <div className="text-xs text-muted-foreground" data-testid="text-student-placements-count-label">
              Placements in history
            </div>
            <div className="mt-1 text-sm font-medium" data-testid="text-student-placements-count-value">
              {placements.length}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StaffPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <div className="text-sm font-medium" data-testid="text-staff-tools-title">
            Admin tools
          </div>
          <div className="text-sm text-muted-foreground" data-testid="text-staff-tools-subtitle">
            CRM + device management.
          </div>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-staff-crm">
            <div className="text-sm font-medium" data-testid="text-staff-crm-title">
              CRM
            </div>
            <div className="mt-2 text-sm text-muted-foreground" data-testid="text-staff-crm-desc">
              Students, alumni, and applications.
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-staff-devices">
            <div className="text-sm font-medium" data-testid="text-staff-devices-title">
              Device management
            </div>
            <div className="mt-2 text-sm text-muted-foreground" data-testid="text-staff-devices-desc">
              Inventory, assignment, check-ins.
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <div className="text-sm font-medium" data-testid="text-staff-analytics-title">
            Program KPIs
          </div>
          <div className="text-sm text-muted-foreground" data-testid="text-staff-analytics-subtitle">
            Outcomes and pipeline visibility.
          </div>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-kpi-completions">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium" data-testid="text-kpi-completions-title">
                Completed programs
              </div>
              <div className="text-sm font-semibold" data-testid="text-kpi-completions-value">
                214
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground" data-testid="text-kpi-completions-meta">
              +12% this quarter
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-kpi-returning">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium" data-testid="text-kpi-returning-title">
                Returning participants
              </div>
              <div className="text-sm font-semibold" data-testid="text-kpi-returning-value">
                46
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground" data-testid="text-kpi-returning-meta">
              alumni re-engaged
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-kpi-placement">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium" data-testid="text-kpi-placement-title">
                Job placements
              </div>
              <div className="text-sm font-semibold" data-testid="text-kpi-placement-value">
                71
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground" data-testid="text-kpi-placement-meta">
              median time-to-hire: 39 days
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <div className="text-sm font-medium" data-testid="text-staff-learning-title">
            Learning access
          </div>
          <div className="text-sm text-muted-foreground" data-testid="text-staff-learning-subtitle">
            Everyone with learning responsibilities.
          </div>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-staff-lms">
            <div className="text-sm font-medium" data-testid="text-staff-lms-title">
              Learning platform
            </div>
            <div className="mt-2 text-sm text-muted-foreground" data-testid="text-staff-lms-desc">
              Cohorts, sessions, modules.
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-staff-cohorts">
            <div className="text-sm font-medium" data-testid="text-staff-cohorts-title">
              Cohorts
            </div>
            <div className="mt-2 text-sm text-muted-foreground" data-testid="text-staff-cohorts-desc">
              Facilitators and schedules.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExperiencePanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <div className="text-sm font-medium" data-testid="text-exp-mentors-title">
            Mentors
          </div>
          <div className="text-sm text-muted-foreground" data-testid="text-exp-mentors-subtitle">
            Sessions, notes, and follow-ups.
          </div>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-exp-sessions">
            <div className="text-sm font-medium" data-testid="text-exp-sessions-title">
              Upcoming session
            </div>
            <div className="mt-2 text-sm text-muted-foreground" data-testid="text-exp-sessions-desc">
              Portfolio review • Friday 1:30 PM
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-exp-relationships">
            <div className="text-sm font-medium" data-testid="text-exp-relationships-title">
              Relationship health
            </div>
            <div className="mt-2 text-sm text-muted-foreground" data-testid="text-exp-relationships-desc">
              12 active mentorship pairs
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <div className="text-sm font-medium" data-testid="text-exp-alumni-title">
            Alumni journeys
          </div>
          <div className="text-sm text-muted-foreground" data-testid="text-exp-alumni-subtitle">
            Returning alumni + job-seeking support.
          </div>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-exp-returning">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium" data-testid="text-exp-returning-title">
                Returning alumni
              </div>
              <div className="text-sm font-semibold" data-testid="text-exp-returning-value">
                18
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground" data-testid="text-exp-returning-meta">
              last 60 days
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-exp-job-secured">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium" data-testid="text-exp-job-secured-title">
                Job secured
              </div>
              <div className="text-sm font-semibold" data-testid="text-exp-job-secured-value">
                9
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground" data-testid="text-exp-job-secured-meta">
              tracking in progress
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <div className="text-sm font-medium" data-testid="text-exp-partners-title">
            Partner workspace
          </div>
          <div className="text-sm text-muted-foreground" data-testid="text-exp-partners-subtitle">
            Collaborators, context, and shared artifacts.
          </div>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-exp-partner-neon">
            <div className="text-sm font-medium" data-testid="text-exp-partner-neon-title">
              NEON CRM founder
            </div>
            <div className="mt-2 text-sm text-muted-foreground" data-testid="text-exp-partner-neon-desc">
              Stakeholder view • shared notes & requests
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-exp-partner-assets">
            <div className="text-sm font-medium" data-testid="text-exp-partner-assets-title">
              Assets
            </div>
            <div className="mt-2 text-sm text-muted-foreground" data-testid="text-exp-partner-assets-desc">
              Templates, references, and outcomes reporting
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RolePage({ role }: { role: RoleKey }) {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const currentTab = searchParams.get("tab") || "dashboard";
  
  const [allStudents, setAllStudents] = React.useState<StudentLookupResult[]>([]);
  const [datasetState, setDatasetState] = React.useState<
    | { status: "loading" }
    | {
        status: "ready";
        kpis: {
          activePlacements: number;
          completedPlacements: number;
          activeStudents: number;
          mentorsActive: number;
          avgHourlyWageActive: number;
        };
        selectedStudent: {
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
        studentGoals: {
          goal_id: string;
          goal_type: string;
          goal_title: string;
          progress_percentage: number;
          status: string;
          priority: string;
          target_completion_date: string;
        }[];
        studentSkills: {
          student_skill_id: string;
          skill_id: string;
          current_proficiency_level: string;
          target_proficiency_level: string;
          assessment_score: number;
          hours_practiced: number;
          projects_completed: number;
          learning_style: string;
          status: string;
        }[];
        studentPlacements: {
          placement_id: string;
          placement_type: string;
          employer_name: string;
          industry: string;
          job_title: string;
          hourly_wage: number;
          hours_per_week: number;
          is_current: boolean;
          better_youth_referral: boolean;
          performance_rating: string;
          status: string;
        }[];
      }
    | { status: "error"; message: string }
  >({ status: "loading" });

  React.useEffect(() => {
    let mounted = true;

    Promise.all([
      getStudents(),
      getMentors(),
      getAllPlacements(),
    ])
      .then(async ([students, mentors, allPlacements]) => {
        if (!mounted) return;

        // Store all students for lookup feature
        setAllStudents(students.map((s) => ({
          id: s.id,
          studentId: s.studentId,
          ageRange: s.ageRange,
          enrollmentDate: s.enrollmentDate,
          gradeLevel: s.gradeLevel,
          schoolType: s.schoolType,
          primaryLanguage: s.primaryLanguage,
          transportationNeeds: s.transportationNeeds,
          hasIep: s.hasIep,
          photoConsent: s.photoConsent,
          status: s.status,
        })));

        const activeStudents = students.filter((s) => s.status.toLowerCase() === "active").length;
        const mentorsActive = mentors.filter((m) => m.status.toLowerCase() === "active").length;
        
        // Calculate KPIs from ALL placements
        const activePlacements = allPlacements.filter((p) => p.status?.toLowerCase() === "active").length;
        const completedPlacements = allPlacements.filter((p) => p.status?.toLowerCase() === "completed").length;

        const activePlacementWages = allPlacements
          .filter((p) => p.status?.toLowerCase() === "active")
          .map((p) => Number(p.hourlyWage) || 0)
          .filter((n) => Number.isFinite(n) && n > 0);

        const avgHourlyWageActive = activePlacementWages.length
          ? activePlacementWages.reduce((a, b) => a + b, 0) / activePlacementWages.length
          : 0;

        const selectedStudent = students[0];

        if (!selectedStudent) {
          setDatasetState({
            status: "ready",
            kpis: {
              activePlacements,
              completedPlacements,
              activeStudents,
              mentorsActive,
              avgHourlyWageActive,
            },
            selectedStudent: {
              student_id: "—",
              age_range: "—",
              enrollment_date: "—",
              grade_level: "—",
              school_type: "—",
              primary_language: "—",
              transportation_needs: false,
              has_iep: false,
              photo_consent: false,
              status: "—",
            },
            studentGoals: [],
            studentSkills: [],
            studentPlacements: [],
          });
          return;
        }

        const [goals, skills, studentPlacements] = await Promise.all([
          getStudentGoals(selectedStudent.id),
          getStudentSkills(selectedStudent.id),
          getStudentPlacements(selectedStudent.id),
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
          student_skill_id: sk.id,
          skill_id: sk.skillId,
          current_proficiency_level: sk.currentProficiencyLevel || "",
          target_proficiency_level: sk.targetProficiencyLevel || "",
          assessment_score: sk.assessmentScore || 0,
          hours_practiced: sk.hoursPracticed || 0,
          projects_completed: sk.projectsCompleted || 0,
          learning_style: sk.learningStyle || "",
          status: sk.status || "active",
        }));

        const studentPlacementsList = studentPlacements.map((p) => ({
          placement_id: p.id,
          placement_type: p.placementType || "",
          employer_name: p.employerName || "",
          industry: p.industry || "",
          job_title: p.jobTitle || "",
          hourly_wage: Number(p.hourlyWage) || 0,
          hours_per_week: p.hoursPerWeek || 0,
          is_current: p.isCurrent || false,
          better_youth_referral: p.betterYouthReferral || false,
          performance_rating: p.performanceRating || "",
          status: p.status || "active",
        }));

        setDatasetState({
          status: "ready",
          kpis: {
            activePlacements,
            completedPlacements,
            activeStudents,
            mentorsActive,
            avgHourlyWageActive,
          },
          selectedStudent: {
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
          studentGoals,
          studentSkills,
          studentPlacements: studentPlacementsList,
        });
      })
      .catch((e) => {
        if (!mounted) return;
        setDatasetState({
          status: "error",
          message: e instanceof Error ? e.message : "Failed to load data from API",
        });
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between gap-4" data-testid="row-role-top-actions">
        <Link href="/">
          <Button
            variant="secondary"
            className="rounded-full bg-white/70 border border-border hover:bg-white"
            data-testid="button-back-home"
          >
            Back
          </Button>
        </Link>

        <Button
          variant="secondary"
          className="rounded-full bg-white/70 border border-border hover:bg-white"
          onClick={() => setLocation("/")}
          data-testid="button-switch-role"
        >
          Switch role
        </Button>
      </div>

      <div className="pt-8">
        <RoleHeader role={role} />
      </div>

      <div className="pt-6">
        <QuickActions role={role} />
      </div>

      {role === "staff" && currentTab === "lookup" ? (
        <div className="pt-6">
          <LookupStudentSection students={allStudents} isLoading={datasetState.status === "loading"} />
        </div>
      ) : role === "staff" ? (
          <div className="pt-6">
            <div className="grid gap-3 md:grid-cols-5">
              <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-muted-foreground" data-testid="text-kpi-active-students-label">
                        Active students
                      </div>
                      <div className="mt-1 text-2xl font-semibold" data-testid="text-kpi-active-students-value">
                        {datasetState.status === "ready" ? datasetState.kpis.activeStudents : "\u2014"}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-[hsl(var(--primary)/0.12)] p-2">
                      <Users className="h-4 w-4 text-[hsl(var(--primary))]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-muted-foreground" data-testid="text-kpi-completed-placements-label">
                        Completed placements
                      </div>
                      <div className="mt-1 text-2xl font-semibold" data-testid="text-kpi-completed-placements-value">
                        {datasetState.status === "ready" ? datasetState.kpis.completedPlacements : "\u2014"}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-[hsl(261_78%_62%/0.12)] p-2">
                      <BadgeCheck className="h-4 w-4 text-[hsl(261_78%_62%)]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-muted-foreground" data-testid="text-kpi-active-mentors-label">
                        Active mentors
                      </div>
                      <div className="mt-1 text-2xl font-semibold" data-testid="text-kpi-active-mentors-value">
                        {datasetState.status === "ready" ? datasetState.kpis.mentorsActive : "\u2014"}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-[hsl(var(--accent)/0.12)] p-2">
                      <Handshake className="h-4 w-4 text-[hsl(var(--accent))]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {datasetState.status === "error" ? (
              <div
                className="mt-3 rounded-2xl border border-border bg-white/70 p-3 text-sm text-muted-foreground"
                data-testid="status-dataset-error"
              >
                Couldn\u2019t load the dataset: {datasetState.message}
              </div>
            ) : (
              <div
                className="mt-3 rounded-2xl border border-border bg-white/50 p-3 text-xs text-muted-foreground"
                data-testid="status-dataset-note"
              >
                KPIs are computed from the attached CSV dataset (front-end only).
              </div>
            )}
          </div>
        ) : null}

      <div className="pt-8 pb-2">
        <Tabs defaultValue="overview" className="w-full" data-testid="tabs-role">
          <TabsList
            className="w-full justify-start gap-1 rounded-2xl bg-white/60 border border-border p-1"
            data-testid="tabslist-role"
          >
              <TabsTrigger className="rounded-xl" value="overview" data-testid="tab-overview">
                Overview
              </TabsTrigger>
              <TabsTrigger className="rounded-xl" value="learning" data-testid="tab-learning">
                Learning
              </TabsTrigger>
              <TabsTrigger className="rounded-xl" value="engagement" data-testid="tab-engagement">
                Engagement
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-5" data-testid="panel-overview">
              {role === "student" ? (
                <StudentPanel datasetState={datasetState} />
              ) : role === "staff" ? (
                <StaffPanel />
              ) : (
                <ExperiencePanel />
              )}
            </TabsContent>

            <TabsContent value="learning" className="mt-5" data-testid="panel-learning">
              <div className="grid gap-4 lg:grid-cols-3">
                <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <div className="text-sm font-medium" data-testid="text-learning-title">
                        Learning platform
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid="text-learning-subtitle">
                      Available for all roles with learning responsibilities.
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-learning-module-1">
                      <div className="text-sm font-medium" data-testid="text-learning-module-1-title">
                        Module: Media Arts Foundations
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground" data-testid="text-learning-module-1-desc">
                        Story, production basics, and creative confidence.
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-learning-module-2">
                      <div className="text-sm font-medium" data-testid="text-learning-module-2-title">
                        Module: Career Readiness
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground" data-testid="text-learning-module-2-desc">
                        Portfolios, interviewing, networking.
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm lg:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="text-sm font-medium" data-testid="text-learning-access-title">
                      Access logic (prototype)
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid="text-learning-access-subtitle">
                      Example rule set based on the brief.
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-rule-1">
                        <div className="text-sm font-medium" data-testid="text-rule-1-title">
                          Staff
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground" data-testid="text-rule-1-desc">
                          All staff personas must access learning.
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-rule-2">
                        <div className="text-sm font-medium" data-testid="text-rule-2-title">
                          Students
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground" data-testid="text-rule-2-desc">
                          Learning modules + progress tracking per student profile.
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-rule-3">
                        <div className="text-sm font-medium" data-testid="text-rule-3-title">
                          Experience-journey users
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground" data-testid="text-rule-3-desc">
                          Mentors and facilitators get sessions + cohort tools.
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-rule-4">
                        <div className="text-sm font-medium" data-testid="text-rule-4-title">
                          Alumni
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground" data-testid="text-rule-4-desc">
                          Returning journeys + job-seeking support tracking.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="engagement" className="mt-5" data-testid="panel-engagement">
              <div className="grid gap-4 lg:grid-cols-3">
                <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="text-sm font-medium" data-testid="text-engagement-title">
                      Engagement flows
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid="text-engagement-subtitle">
                      End-to-end journey touchpoints.
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-flow-1">
                      <div className="text-sm font-medium" data-testid="text-flow-1-title">
                        Student entry
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground" data-testid="text-flow-1-desc">
                        Intake → assessment → learning plan.
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-flow-2">
                      <div className="text-sm font-medium" data-testid="text-flow-2-title">
                        Program participation
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground" data-testid="text-flow-2-desc">
                        Sessions → cohort support → milestones.
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-flow-3">
                      <div className="text-sm font-medium" data-testid="text-flow-3-title">
                        Alumni outcomes
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground" data-testid="text-flow-3-desc">
                        Re-engage → job search → job secured tracking.
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm lg:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="text-sm font-medium" data-testid="text-engagement-metrics-title">
                      Engagement metrics (sample)
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid="text-engagement-metrics-subtitle">
                      What staff could watch over time.
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-engagement-1">
                        <div className="text-xs text-muted-foreground" data-testid="text-engagement-1-label">
                          Session attendance
                        </div>
                        <div className="mt-2 text-2xl font-semibold" data-testid="text-engagement-1-value">
                          84%
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-engagement-2">
                        <div className="text-xs text-muted-foreground" data-testid="text-engagement-2-label">
                          Mentor participation
                        </div>
                        <div className="mt-2 text-2xl font-semibold" data-testid="text-engagement-2-value">
                          22
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-white/60 p-3" data-testid="card-engagement-3">
                        <div className="text-xs text-muted-foreground" data-testid="text-engagement-3-label">
                          Alumni re-engaged
                        </div>
                        <div className="mt-2 text-2xl font-semibold" data-testid="text-engagement-3-value">
                          46
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
}
