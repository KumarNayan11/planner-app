export interface Habit {
  id: string;
  userId: string;
  weekId: string;

  name: string;
  days: string[]; // ["mon", "tue"]
}
