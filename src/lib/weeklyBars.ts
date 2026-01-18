import { getDayProgress } from "@/lib/progress";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export async function getWeeklyBarData(weekId: string) {
  const data = [];

  for (const day of DAYS) {
    const value = await getDayProgress(weekId, day);
    data.push({
      day: day.toUpperCase(),
      value,
    });
  }

  return data;
}
