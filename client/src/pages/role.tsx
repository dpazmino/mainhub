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
  Paperclip,
  Search,
  Settings2,
  Shield,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { getStudents, getStudentGoals, getStudentSkills, getStudentPlacements, getMentors, getAllPlacements, getStudentProgress, createSupportRequest, type StudentProgressData } from "@/lib/api";
import DevicesGrid from "@/components/DevicesGrid";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  id: string;
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
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const [dashboardState, setDashboardState] = React.useState<
    | { status: "idle" }
    | { status: "loading" }
    | { status: "ready"; goals: any[]; skills: any[]; placements: any[]; progress: StudentProgressData | null }
    | { status: "error"; message: string }
  >({ status: "idle" });

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

  const handleStudentSelect = async (student: StudentLookupResult) => {
    setSelectedStudent(student);
    setSearchQuery(student.studentId);
    setIsDropdownOpen(false);
    
    setDashboardState({ status: "loading" });
    try {
      const [goals, skills, placements, progress] = await Promise.all([
        getStudentGoals(student.id),
        getStudentSkills(student.id),
        getStudentPlacements(student.id),
        getStudentProgress(student.id).catch(() => null),
      ]);
      setDashboardState({ status: "ready", goals, skills, placements, progress });
    } catch (error) {
      setDashboardState({ status: "error", message: "Failed to load student dashboard" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedStudent(null);
    setIsDropdownOpen(true);
  };

  const handleInputFocus = () => {
    if (searchQuery.trim() && !selectedStudent) {
      setIsDropdownOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, student: StudentLookupResult) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleStudentSelect(student);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSelection = () => {
    setSelectedStudent(null);
    setSearchQuery("");
    setIsDropdownOpen(false);
    setDashboardState({ status: "idle" });
    inputRef.current?.focus();
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
          Type to search by student ID, name, or grade level
        </p>
      </div>

      <div className="relative max-w-md" ref={dropdownRef}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Start typing to search..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="pl-10 pr-10 rounded-xl"
          data-testid="input-student-search"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSelection}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            data-testid="button-clear-search"
          >
            ×
          </button>
        )}

        {isDropdownOpen && searchQuery.trim() && !selectedStudent && (
          <div
            className="absolute z-20 mt-1 w-full rounded-xl border border-border bg-white shadow-lg max-h-64 overflow-y-auto"
            role="listbox"
            aria-label="Student search results"
            data-testid="dropdown-student-results"
          >
            {filteredStudents.length > 0 ? (
              filteredStudents.slice(0, 10).map((student) => (
                <div
                  key={student.id}
                  role="option"
                  aria-selected={false}
                  tabIndex={0}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-border/50 last:border-b-0 transition-colors"
                  onClick={() => handleStudentSelect(student)}
                  onKeyDown={(e) => handleKeyDown(e, student)}
                  data-testid={`dropdown-item-${student.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{student.studentId}</div>
                      <div className="text-xs text-muted-foreground">
                        Grade {student.gradeLevel} · {student.schoolType} · {student.ageRange}
                      </div>
                    </div>
                    <Badge
                      variant={student.status.toLowerCase() === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {student.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-muted-foreground" data-testid="dropdown-no-results">
                No students found matching "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {selectedStudent && (
        <Card className="rounded-2xl bg-white/70 border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold" data-testid="text-selected-student-title">
                Student Details: {selectedStudent.studentId}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelection}
                className="text-muted-foreground hover:text-foreground"
                data-testid="button-close-details"
              >
                Search another
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {selectedStudent && dashboardState.status === "loading" && (
        <Card className="rounded-2xl bg-white/70 border-border/70 shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground" data-testid="text-dashboard-loading">
              Loading student dashboard...
            </p>
          </CardContent>
        </Card>
      )}

      {selectedStudent && dashboardState.status === "error" && (
        <Card className="rounded-2xl bg-white/70 border-border/70 shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-red-600" data-testid="text-dashboard-error">
              {dashboardState.message}
            </p>
          </CardContent>
        </Card>
      )}

      {selectedStudent && dashboardState.status === "ready" && (
        <div className="space-y-4" data-testid="container-student-dashboard">
          <h3 className="text-base font-semibold" data-testid="text-dashboard-title">
            Student Dashboard
          </h3>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="rounded-2xl bg-white/70 border-border/70 shadow-sm">
              <CardHeader className="pb-2">
                <div className="text-sm font-medium" data-testid="text-goals-title">Goals & Progress</div>
                <div className="text-xs text-muted-foreground">Track goal completion</div>
              </CardHeader>
              <CardContent>
                {dashboardState.goals.length === 0 ? (
                  <p className="text-sm text-muted-foreground" data-testid="text-no-goals">No goals set</p>
                ) : (
                  <div className="space-y-3">
                    {dashboardState.goals.slice(0, 3).map((goal) => (
                      <div key={goal.id} className="space-y-1" data-testid={`goal-item-${goal.id}`}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium truncate max-w-[150px]">{goal.goalTitle}</span>
                          <Badge variant="secondary" className="text-[10px]">{goal.priority}</Badge>
                        </div>
                        <Progress value={goal.progressPercentage ?? 0} className="h-1.5" />
                        <div className="text-[10px] text-muted-foreground">{goal.progressPercentage ?? 0}% complete</div>
                      </div>
                    ))}
                    {dashboardState.goals.length > 3 && (
                      <p className="text-xs text-muted-foreground">+{dashboardState.goals.length - 3} more goals</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-white/70 border-border/70 shadow-sm">
              <CardHeader className="pb-2">
                <div className="text-sm font-medium" data-testid="text-skills-title">Skills</div>
                <div className="text-xs text-muted-foreground">Current proficiency levels</div>
              </CardHeader>
              <CardContent>
                {dashboardState.skills.length === 0 ? (
                  <p className="text-sm text-muted-foreground" data-testid="text-no-skills">No skills recorded</p>
                ) : (
                  <div className="space-y-2">
                    {dashboardState.skills.slice(0, 4).map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between" data-testid={`skill-item-${skill.id}`}>
                        <span className="text-xs truncate max-w-[120px]">{skill.skillName}</span>
                        <Badge variant="outline" className="text-[10px]">{skill.currentProficiencyLevel}</Badge>
                      </div>
                    ))}
                    {dashboardState.skills.length > 4 && (
                      <p className="text-xs text-muted-foreground">+{dashboardState.skills.length - 4} more skills</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-white/70 border-border/70 shadow-sm">
              <CardHeader className="pb-2">
                <div className="text-sm font-medium" data-testid="text-placements-title">Work Placements</div>
                <div className="text-xs text-muted-foreground">Employment history</div>
              </CardHeader>
              <CardContent>
                {dashboardState.placements.length === 0 ? (
                  <p className="text-sm text-muted-foreground" data-testid="text-no-placements">No placements</p>
                ) : (
                  <div className="space-y-2">
                    {dashboardState.placements.slice(0, 3).map((placement) => (
                      <div key={placement.id} className="space-y-0.5" data-testid={`placement-item-${placement.id}`}>
                        <div className="text-xs font-medium truncate">{placement.jobTitle || "Position"}</div>
                        <div className="text-[10px] text-muted-foreground">{placement.employerName}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant={placement.isCurrent ? "default" : "secondary"} className="text-[10px]">
                            {placement.isCurrent ? "Current" : "Past"}
                          </Badge>
                          {placement.hourlyWage && (
                            <span className="text-[10px] text-green-600">${placement.hourlyWage}/hr</span>
                          )}
                        </div>
                      </div>
                    ))}
                    {dashboardState.placements.length > 3 && (
                      <p className="text-xs text-muted-foreground">+{dashboardState.placements.length - 3} more placements</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {dashboardState.progress && (
            <Card className="rounded-2xl bg-white/70 border-border/70 shadow-sm">
              <CardHeader className="pb-2">
                <div className="text-sm font-medium" data-testid="text-progress-title">Learning Progress</div>
                <div className="text-xs text-muted-foreground">Course completion and activity</div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  <div className="rounded-2xl border border-border bg-white/60 p-3 text-center" data-testid="lookup-stat-streak">
                    <div className="text-lg font-bold text-orange-500">{dashboardState.progress.user.currentStreak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="rounded-2xl border border-border bg-white/60 p-3 text-center" data-testid="lookup-stat-lessons">
                    <div className="text-lg font-bold text-primary">{dashboardState.progress.lessonsCompleted}/{dashboardState.progress.totalLessons}</div>
                    <div className="text-xs text-muted-foreground">Lessons</div>
                  </div>
                  <div className="rounded-2xl border border-border bg-white/60 p-3 text-center" data-testid="lookup-stat-videos">
                    <div className="text-lg font-bold text-primary">{dashboardState.progress.videosWatched}/{dashboardState.progress.totalVideos}</div>
                    <div className="text-xs text-muted-foreground">Videos</div>
                  </div>
                  <div className="rounded-2xl border border-border bg-white/60 p-3 text-center" data-testid="lookup-stat-progress">
                    <div className="text-lg font-bold text-green-600">{dashboardState.progress.progressPercent}%</div>
                    <div className="text-xs text-muted-foreground">Progress</div>
                  </div>
                  <div className="rounded-2xl border border-border bg-white/60 p-3 text-center" data-testid="lookup-stat-level">
                    <div className="text-lg font-bold text-purple-600">Lvl {dashboardState.progress.user.level}</div>
                    <div className="text-xs text-muted-foreground">{dashboardState.progress.user.totalXp} XP</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

const servicesByCategory: Record<string, string[]> = {
  "Housing": [
    "Housing Assistance",
    "Emergency Shelter Referral",
    "Transitional Housing",
    "Transportation Support",
    "Food Assistance",
    "Clothing Closet",
  ],
  "Basic Needs": [
    "Food Assistance",
    "Clothing Closet",
    "School Supplies",
    "Transportation Support",
    "Technology Access",
    "ID Document Assistance",
  ],
  "Mental Health": [
    "Mental Health Counseling",
    "Crisis Intervention",
    "Peer Support Groups",
    "Family Reunification Support",
  ],
  "Education": [
    "Academic Tutoring",
    "College Prep Support",
    "SAT/ACT Prep",
    "School Supplies",
    "Technology Access",
  ],
  "Employment": [
    "Job Placement Assistance",
    "Resume Building",
    "Interview Coaching",
    "Financial Literacy Coaching",
  ],
  "Financial": [
    "Banking Setup",
    "Financial Literacy Coaching",
    "Insurance Enrollment",
    "ID Document Assistance",
  ],
  "Healthcare": [
    "Healthcare Navigation",
    "Insurance Enrollment",
    "Mental Health Counseling",
  ],
  "Legal": [
    "Legal Aid Referral",
    "ID Document Assistance",
    "Independent Living Skills",
  ],
};

function QuickActions({ role, studentId, onNavigate }: { role: RoleKey; studentId?: string; onNavigate?: (tab: string) => void }) {
  const [supportModalOpen, setSupportModalOpen] = React.useState(false);
  const [supportForm, setSupportForm] = React.useState({
    serviceCategory: "",
    serviceName: "",
    title: "",
    description: "",
    attachmentName: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const availableServices = supportForm.serviceCategory
    ? servicesByCategory[supportForm.serviceCategory] || []
    : [];

  const handleCategoryChange = (category: string) => {
    setSupportForm(prev => ({
      ...prev,
      serviceCategory: category,
      serviceName: "",
    }));
  };

  const handleSubmitSupportRequest = async () => {
    if (!studentId || !supportForm.title.trim() || !supportForm.description.trim()) return;
    
    setIsSubmitting(true);
    try {
      await createSupportRequest({
        studentId,
        requestType: `${supportForm.serviceCategory} - ${supportForm.serviceName}`,
        title: supportForm.title,
        description: supportForm.description,
        attachmentName: supportForm.attachmentName || null,
      });
      setSupportModalOpen(false);
      setSupportForm({ serviceCategory: "", serviceName: "", title: "", description: "", attachmentName: "" });
    } catch (error) {
      console.error("Failed to submit support request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current?.files?.[0]) {
      setSupportForm(prev => ({
        ...prev,
        attachmentName: fileInputRef.current!.files![0].name,
      }));
    }
  };

  const actions: Record<RoleKey, { label: string; icon: React.ReactNode; onClick?: () => void }[]> = {
    student: [
      { label: "Take skill check", icon: <ClipboardList className="h-4 w-4" /> },
      { label: "View learning path", icon: <BookOpen className="h-4 w-4" /> },
      { label: "Update support needs", icon: <Users className="h-4 w-4" />, onClick: () => setSupportModalOpen(true) },
    ],
    staff: [
      { label: "Open CRM", icon: <Users className="h-4 w-4" />, onClick: () => onNavigate?.("lookup") },
      { label: "Device management", icon: <Laptop className="h-4 w-4" />, onClick: () => onNavigate?.("devices") },
      { label: "KPI snapshot", icon: <LineChart className="h-4 w-4" /> },
    ],
    experience: [
      { label: "Mentor sessions", icon: <Handshake className="h-4 w-4" /> },
      { label: "Alumni journey", icon: <BadgeCheck className="h-4 w-4" /> },
      { label: "Partner workspace", icon: <Settings2 className="h-4 w-4" /> },
    ],
  };

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {actions[role].map((a, idx) => (
          <Button
            key={a.label}
            variant="secondary"
            className="justify-start gap-2 rounded-2xl bg-white/70 border border-border hover:bg-white"
            data-testid={`button-quick-action-${role}-${idx}`}
            onClick={a.onClick}
          >
            {a.icon}
            <span>{a.label}</span>
          </Button>
        ))}
      </div>

      <Dialog open={supportModalOpen} onOpenChange={setSupportModalOpen}>
        <DialogContent className="sm:max-w-[500px]" data-testid="dialog-support-request">
          <DialogHeader>
            <DialogTitle data-testid="dialog-support-title">Submit Support Request</DialogTitle>
            <DialogDescription data-testid="dialog-support-description">
              Tell us what you need help with. Our team will review your request and get back to you.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="service-category">Service Category</Label>
              <select
                id="service-category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={supportForm.serviceCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                data-testid="select-service-category"
              >
                <option value="">Select a category...</option>
                {Object.keys(servicesByCategory).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="service-name">Service Name</Label>
              <select
                id="service-name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                value={supportForm.serviceName}
                onChange={(e) => setSupportForm(prev => ({ ...prev, serviceName: e.target.value }))}
                disabled={!supportForm.serviceCategory}
                data-testid="select-service-name"
              >
                <option value="">
                  {supportForm.serviceCategory ? "Select a service..." : "Select a category first"}
                </option>
                {availableServices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="request-title">Title</Label>
              <Input
                id="request-title"
                placeholder="Brief summary of your request"
                value={supportForm.title}
                onChange={(e) => setSupportForm(prev => ({ ...prev, title: e.target.value }))}
                data-testid="input-request-title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="request-description">Description</Label>
              <Textarea
                id="request-description"
                placeholder="Please provide details about what you need..."
                className="min-h-[100px]"
                value={supportForm.description}
                onChange={(e) => setSupportForm(prev => ({ ...prev, description: e.target.value }))}
                data-testid="textarea-request-description"
              />
            </div>

            <div className="grid gap-2">
              <Label>Attachment (optional)</Label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                  data-testid="input-file-attachment"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                  data-testid="button-attach-file"
                >
                  <Paperclip className="h-4 w-4" />
                  Attach File
                </Button>
                {supportForm.attachmentName && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span className="truncate max-w-[200px]">{supportForm.attachmentName}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => {
                        setSupportForm(prev => ({ ...prev, attachmentName: "" }));
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      data-testid="button-remove-attachment"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSupportModalOpen(false)}
              data-testid="button-cancel-request"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitSupportRequest}
              disabled={isSubmitting || !supportForm.title.trim() || !supportForm.description.trim()}
              data-testid="button-submit-request"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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
        progressData: StudentProgressData | null;
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="status-student-dataset-loading">
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

  return (
    <div className="grid gap-4">
      {/* Goals & Progress and Work Placement cards removed */}
      <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <div className="text-sm font-medium" data-testid="text-student-timeline-title">
            Progress Timeline
          </div>
          <div className="text-sm text-muted-foreground" data-testid="text-student-timeline-subtitle">
            Your learning journey and milestones.
          </div>
        </CardHeader>
        <CardContent>
          {!datasetState.progressData ? (
            <div className="text-sm text-muted-foreground" data-testid="text-timeline-empty">
              No progress data yet.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3" data-testid="progress-stats-grid">
                <div className="rounded-2xl border border-border bg-white/60 p-3 text-center" data-testid="stat-streak">
                  <div className="text-lg font-bold text-orange-500">{datasetState.progressData.user.currentStreak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="rounded-2xl border border-border bg-white/60 p-3 text-center" data-testid="stat-lessons">
                  <div className="text-lg font-bold text-primary">{datasetState.progressData.lessonsCompleted}/{datasetState.progressData.totalLessons}</div>
                  <div className="text-xs text-muted-foreground">Lessons</div>
                </div>
                <div className="rounded-2xl border border-border bg-white/60 p-3 text-center" data-testid="stat-videos">
                  <div className="text-lg font-bold text-primary">{datasetState.progressData.videosWatched}/{datasetState.progressData.totalVideos}</div>
                  <div className="text-xs text-muted-foreground">Videos</div>
                </div>
                <div className="rounded-2xl border border-border bg-white/60 p-3 text-center" data-testid="stat-progress">
                  <div className="text-lg font-bold text-green-600">{datasetState.progressData.progressPercent}%</div>
                  <div className="text-xs text-muted-foreground">Progress</div>
                </div>
                <div className="rounded-2xl border border-border bg-white/60 p-3 text-center" data-testid="stat-week">
                  <div className="text-lg font-bold text-blue-600">Week {datasetState.progressData.currentWeek}</div>
                  <div className="text-xs text-muted-foreground">Current</div>
                </div>
              </div>

              {(datasetState.progressData.recentProgress?.length ?? 0) > 0 && (
                <div className="space-y-0" data-testid="timeline-container">
                  <div className="text-xs font-medium text-muted-foreground mb-2">Recent Activity</div>
                  {datasetState.progressData.recentProgress.map((item, index) => (
                    <div key={item.lessonId} className="relative flex gap-4" data-testid={`timeline-item-${item.lessonId}`}>
                      <div className="flex flex-col items-center">
                        <div
                          className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-500 bg-green-50 text-green-600"
                          data-testid={`timeline-dot-${item.lessonId}`}
                        >
                          <BookOpen className="h-4 w-4" />
                        </div>
                        {index < (datasetState.progressData?.recentProgress?.length ?? 0) - 1 && (
                          <div className="w-0.5 flex-1 bg-green-300" style={{ minHeight: "2rem" }} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="rounded-2xl border border-border bg-white/60 p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-sm font-medium" data-testid={`timeline-title-${item.lessonId}`}>
                                Lesson: {item.lessonId}
                              </div>
                              <div className="mt-1 text-xs text-muted-foreground">
                                Week {item.week} • {item.audience} •{" "}
                                {[item.video1Completed, item.video2Completed, item.video3Completed].filter(Boolean).length}/3 videos
                              </div>
                            </div>
                            <Badge variant="secondary" className="rounded-full text-[10px] bg-green-100 text-green-700">
                              +{item.xpEarned} XP
                            </Badge>
                          </div>
                          <div className="mt-2 text-[10px] text-muted-foreground">
                            {new Date(item.completedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(datasetState.progressData.timeline?.length ?? 0) > 0 && (
                <div className="space-y-0" data-testid="waterfall-timeline-container">
                  <div className="text-xs font-medium text-muted-foreground mb-2">Journey Milestones</div>
                  {datasetState.progressData.timeline.map((item, index) => (
                    <div key={item.id} className="relative flex gap-4" data-testid={`waterfall-item-${item.id}`}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                            item.status === "completed"
                              ? "border-green-500 bg-green-50 text-green-600"
                              : item.status === "in_progress"
                              ? "border-blue-500 bg-blue-50 text-blue-600"
                              : "border-gray-300 bg-gray-50 text-gray-400"
                          }`}
                          data-testid={`waterfall-dot-${item.id}`}
                        >
                          {item.type === "enrollment" && <GraduationCap className="h-4 w-4" />}
                          {item.type === "goal" && <ClipboardList className="h-4 w-4" />}
                          {item.type === "skill" && <TrendingUp className="h-4 w-4" />}
                          {item.type === "placement" && <Briefcase className="h-4 w-4" />}
                          {item.type === "milestone" && <BadgeCheck className="h-4 w-4" />}
                        </div>
                        {index < (datasetState.progressData?.timeline?.length ?? 0) - 1 && (
                          <div
                            className={`w-0.5 flex-1 ${
                              item.status === "completed" ? "bg-green-300" : "bg-gray-200"
                            }`}
                            style={{ minHeight: "2rem" }}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="rounded-2xl border border-border bg-white/60 p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-sm font-medium truncate" data-testid={`waterfall-title-${item.id}`}>
                                {item.title}
                              </div>
                              <div className="mt-1 text-xs text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className={`rounded-full text-[10px] shrink-0 ${
                                item.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : item.status === "in_progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {item.status === "completed" ? "Done" : item.status === "in_progress" ? "Active" : "Upcoming"}
                            </Badge>
                          </div>
                          <div className="mt-2 text-[10px] text-muted-foreground">
                            {new Date(item.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StaffPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        progressData: StudentProgressData | null;
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
          studentId: s.id,
          ageRange: s.ageRange || "",
          enrollmentDate: s.enrollmentDate || "",
          gradeLevel: s.gradeLevel || "",
          schoolType: s.schoolType || "",
          primaryLanguage: s.primaryLanguage || "",
          transportationNeeds: s.transportationNeeds || false,
          hasIep: s.hasIep || false,
          photoConsent: s.photoConsent || false,
          status: s.status || "",
        })));

        const activeStudents = students.filter((s) => (s.status || "").toLowerCase() === "active").length;
        const mentorsActive = mentors.filter((m) => (m.status || "").toLowerCase() === "active").length;
        
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
            progressData: null,
          });
          return;
        }

        const [goals, skills, studentPlacements, progressData] = await Promise.all([
          getStudentGoals(selectedStudent.id),
          getStudentSkills(selectedStudent.id),
          getStudentPlacements(selectedStudent.id),
          getStudentProgress(selectedStudent.id),
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
          progressData,
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

        <div className="flex items-center gap-3">
          {role === "student" && datasetState.status === "ready" && datasetState.progressData && (
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 px-3 py-1.5" data-testid="student-level-xp">
              <div className="flex items-center gap-1">
                <div className="h-6 w-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center" data-testid="text-student-level">
                  {datasetState.progressData.user.level}
                </div>
                <span className="text-xs font-medium text-amber-700">Level</span>
              </div>
              <div className="w-px h-4 bg-amber-300" />
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-amber-600" data-testid="text-student-xp">{datasetState.progressData.user.totalXp}</span>
                <span className="text-xs text-amber-700">XP</span>
              </div>
            </div>
          )}
          <Button
            variant="secondary"
            className="rounded-full bg-white/70 border border-border hover:bg-white"
            onClick={() => setLocation("/")}
            data-testid="button-switch-role"
          >
            Switch role
          </Button>
        </div>
      </div>

      <div className="pt-8">
        <RoleHeader role={role} />
      </div>

      <div className="pt-6">
        <QuickActions 
          role={role} 
          studentId={role === "student" && datasetState.status === "ready" ? datasetState.selectedStudent?.student_id : undefined}
          onNavigate={(tab) => setLocation(`/role/staff?tab=${tab}`)}
        />
      </div>

      {role === "staff" && currentTab === "devices" ? (
        <div className="pt-6">
          <DevicesGrid />
        </div>
      ) : role === "staff" && currentTab === "lookup" ? (
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

      <div className="pt-8 pb-2" data-testid="panel-overview">
        {role === "student" ? (
          <StudentPanel datasetState={datasetState} />
        ) : role === "staff" ? (
          <StaffPanel />
        ) : (
          <ExperiencePanel />
        )}
      </div>
    </div>
  );
}
