export interface Task {
  userId: string;
  weekId: string;
  day: string;

  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TaskWithId extends Task {
  id: string;
}
