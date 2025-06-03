
import { supabase } from "@/integrations/supabase/client";

export interface StudentData {
  id: string;
  rollNo: string;
  name: string;
  gender: string;
  class: string;
  riskLevel: 'High' | 'Moderate' | 'Low';
  riskPercentage: number;
  emotionalOverwhelm: number;
  lonelinessStress: number;
  depression: number;
  eatingHabits: number;
}

// Mock function to calculate risk from assessment responses
const calculateRiskFromResponses = (responses: any): { riskLevel: 'High' | 'Moderate' | 'Low', riskPercentage: number, categories: any } => {
  // Mock calculation - in real implementation, this would use your ML model
  const mockRisk = Math.random() * 100;
  let riskLevel: 'High' | 'Moderate' | 'Low';
  
  if (mockRisk > 70) riskLevel = 'High';
  else if (mockRisk > 40) riskLevel = 'Moderate';
  else riskLevel = 'Low';

  return {
    riskLevel,
    riskPercentage: Math.round(mockRisk),
    categories: {
      emotionalOverwhelm: Math.round(Math.random() * 100),
      lonelinessStress: Math.round(Math.random() * 100),
      depression: Math.round(Math.random() * 100),
      eatingHabits: Math.round(Math.random() * 100),
    }
  };
};

export const fetchStudentData = async (): Promise<StudentData[]> => {
  try {
    // Fetch demographics and assessment responses
    const { data: demographics, error: demoError } = await supabase
      .from('demographics')
      .select('*');

    const { data: assessments, error: assessError } = await supabase
      .from('assessment_responses')
      .select('*');

    if (demoError || assessError) {
      console.error('Error fetching data:', demoError || assessError);
      return getMockStudentData(); // Return mock data if database query fails
    }

    // Combine demographics with assessment data
    const combinedData: StudentData[] = [];
    
    if (demographics && assessments) {
      demographics.forEach((demo) => {
        const userAssessments = assessments.filter(a => a.user_id === demo.user_id);
        if (userAssessments.length > 0) {
          const latestAssessment = userAssessments[userAssessments.length - 1];
          const riskData = calculateRiskFromResponses(latestAssessment.responses);
          
          combinedData.push({
            id: demo.user_id,
            rollNo: `ST${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
            name: `Student ${Math.floor(Math.random() * 1000)}`,
            gender: demo.gender || 'Not specified',
            class: demo.grade || 'Unknown',
            riskLevel: riskData.riskLevel,
            riskPercentage: riskData.riskPercentage,
            emotionalOverwhelm: riskData.categories.emotionalOverwhelm,
            lonelinessStress: riskData.categories.lonelinessStress,
            depression: riskData.categories.depression,
            eatingHabits: riskData.categories.eatingHabits,
          });
        }
      });
    }

    // If no data from database, return mock data
    return combinedData.length > 0 ? combinedData : getMockStudentData();
  } catch (error) {
    console.error('Error in fetchStudentData:', error);
    return getMockStudentData();
  }
};

const getMockStudentData = (): StudentData[] => {
  const mockData: StudentData[] = [];
  const grades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];
  const genders = ['Male', 'Female', 'Other'];
  const names = [
    'Alex Johnson', 'Sarah Smith', 'Michael Brown', 'Emma Wilson', 'James Davis',
    'Olivia Miller', 'William Jones', 'Sophia Garcia', 'Benjamin Martinez', 'Isabella Rodriguez',
    'Lucas Anderson', 'Mia Taylor', 'Henry Thomas', 'Charlotte Jackson', 'Alexander White'
  ];

  for (let i = 0; i < 50; i++) {
    const riskPercentage = Math.floor(Math.random() * 100);
    let riskLevel: 'High' | 'Moderate' | 'Low';
    
    if (riskPercentage > 70) riskLevel = 'High';
    else if (riskPercentage > 40) riskLevel = 'Moderate';
    else riskLevel = 'Low';

    mockData.push({
      id: `student_${i + 1}`,
      rollNo: `ST${String(i + 1).padStart(4, '0')}`,
      name: names[i % names.length],
      gender: genders[Math.floor(Math.random() * genders.length)],
      class: grades[Math.floor(Math.random() * grades.length)],
      riskLevel,
      riskPercentage,
      emotionalOverwhelm: Math.floor(Math.random() * 100),
      lonelinessStress: Math.floor(Math.random() * 100),
      depression: Math.floor(Math.random() * 100),
      eatingHabits: Math.floor(Math.random() * 100),
    });
  }

  return mockData;
};

export const exportToCSV = (data: StudentData[]) => {
  const csvContent = [
    ['Roll No', 'Name', 'Gender', 'Class', 'Risk Level', 'Risk Percentage', 'Emotional Overwhelm', 'Loneliness Stress', 'Depression', 'Eating Habits'],
    ...data.map(student => [
      student.rollNo,
      student.name,
      student.gender,
      student.class,
      student.riskLevel,
      student.riskPercentage.toString(),
      student.emotionalOverwhelm.toString(),
      student.lonelinessStress.toString(),
      student.depression.toString(),
      student.eatingHabits.toString()
    ])
  ];

  const csvString = csvContent.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'student_risk_assessment.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};
