export interface Course {
  id: string;
  title: string;
  lastEdited: Date;
  moduleCount: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  learningOutcomes: string[];
  keyConcepts: string[];
  activities: string[];
  moduleId?: string;
  prerequisites?: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}