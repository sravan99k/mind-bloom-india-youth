import { supabase } from "@/integrations/supabase/client";

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  section: string;
  risk_level: 'low' | 'medium' | 'high';
  last_assessment: string;
  wellbeing_score: number;
  attendance: number;
  interventions: {
    type: string;
    date: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  }[];
  assessments: {
    date: string;
    score: number;
    category: string;
  }[];
}

export interface SchoolAnalytics {
  totalStudents: number;
  highRiskStudents: number;
  interventionsThisMonth: number;
  averageWellbeingScore: number;
  wellbeingTrend: 'improving' | 'declining' | 'stable';
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  gradeDistribution: Record<string, number>;
  recentAssessments: Array<{
    date: string;
    count: number;
  }>;
}

export const fetchSchoolAnalytics = async (schoolId: string): Promise<SchoolAnalytics> => {
  // In a real app, you would fetch this from your database
  // This is mock data for demonstration
  return {
    totalStudents: 1247,
    highRiskStudents: 42,
    interventionsThisMonth: 128,
    averageWellbeingScore: 7.2,
    wellbeingTrend: 'improving',
    riskDistribution: {
      low: 850,
      medium: 355,
      high: 42,
    },
    gradeDistribution: {
      '6': 210,
      '7': 215,
      '8': 220,
      '9': 302,
      '10': 300,
    },
    recentAssessments: [
      { date: '2023-05-01', count: 45 },
      { date: '2023-05-02', count: 67 },
      { date: '2023-05-03', count: 89 },
      { date: '2023-05-04', count: 56 },
      { date: '2023-05-05', count: 34 },
    ],
  };
};

export const fetchStudents = async (filters = {}) => {
  // In a real app, you would fetch this from your database with proper filtering
  const mockStudents: Student[] = Array.from({ length: 50 }, (_, i) => ({
    id: `std_${i + 1}`,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@school.edu`,
    grade: ['6', '7', '8', '9', '10'][Math.floor(Math.random() * 5)],
    section: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    risk_level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
    last_assessment: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    wellbeing_score: Math.floor(Math.random() * 5) + 5, // 5-10
    attendance: Math.floor(Math.random() * 30) + 70, // 70-100%
    interventions: Array.from({ length: Math.floor(Math.random() * 3) }).map((_, i) => ({
      type: ['Counseling', 'Parent Meeting', 'Peer Support', 'Workshop'][Math.floor(Math.random() * 4)],
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      status: ['pending', 'in-progress', 'completed', 'cancelled'][Math.floor(Math.random() * 4)] as 'pending' | 'in-progress' | 'completed' | 'cancelled',
    })),
    assessments: Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, i) => ({
      date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
      score: Math.floor(Math.random() * 5) + 5, // 5-10
      category: ['General', 'Anxiety', 'Stress', 'Depression', 'Social'][Math.floor(Math.random() * 5)],
    })),
  }));

  return mockStudents;
};

export const fetchStudentDetails = async (studentId: string) => {
  const students = await fetchStudents();
  return students.find(s => s.id === studentId);
};

export const fetchInterventions = async () => {
  const students = await fetchStudents();
  return students.flatMap(student => 
    student.interventions.map(intervention => ({
      ...intervention,
      studentId: student.id,
      studentName: student.name,
      grade: student.grade,
      section: student.section,
    }))
  );
};

export const fetchAssessments = async () => {
  const students = await fetchStudents();
  return students.flatMap(student => 
    student.assessments.map(assessment => ({
      ...assessment,
      studentId: student.id,
      studentName: student.name,
      grade: student.grade,
      section: student.section,
    }))
  );
};
