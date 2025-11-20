
export enum DegreeLevel {
  UNDERGRADUATE = 'Undergraduate',
  MASTERS = 'Masters',
  PHD = 'PhD'
}

export interface StudentProfile {
  gpa: string;
  ielts: string;
  country: string;
  budget: string;
  subject: string;
  level: DegreeLevel;
  gradYear: string;
  researchExp: string;
  workExp: string;
}

export interface University {
  id: string;
  name: string;
  location: string;
  ranking: string;
  tuitionRange: string;
  description: string;
  website: string;
  tags: string[];
  imageUrl: string;
}

// Structure for the AI response parsing
export interface AIRecommendationResult {
  markdownText: string;
  sources: Array<{
    title: string;
    uri: string;
  }>;
}
