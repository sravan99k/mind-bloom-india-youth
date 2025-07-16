
export interface AssessmentResult {
  categories: string[];
  scores: Record<string, number>;
  overallScore: number;
  recommendations: string[];
}

export interface AssessmentData {
  id: string;
  user_id: string;
  categories: string[];
  responses: any;
  results: AssessmentResult | null;
  completed_at: string;
}
