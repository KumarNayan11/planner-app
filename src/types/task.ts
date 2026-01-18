export interface Task {
  id: string;
  userId: string;
  weekId: string;
  day: string; // "mon", "tue", etc

  title: string;
  completed: boolean;
  createdAt: Date;
}
