"use client";

import { useEffect, useState } from "react";
import { getOrCreateCurrentWeek } from "@/lib/week";
import { Week } from "@/types/week";
import WeekEditor from "@/components/planner/WeekEditor";
import WeeklyProgress from "@/components/planner/WeeklyProgress";
import DaysPreview from "@/components/planner/DaysPreview";
import HabitTracker from "@/components/planner/HabitTracker";
import WeeklyDonutChart from "@/components/planner/WeeklyDonutChart";
import WeeklyBarChart from "@/components/planner/WeeklyBarChart";

export default function Home() {
  const [week, setWeek] = useState<Week | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrCreateCurrentWeek()
      .then(setWeek)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading planner...</div>;
  }

  if (!week) {
    return <div className="p-6 text-red-500">Failed to load week</div>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Weekly Planner</h1>

      <WeekEditor week={week} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeeklyDonutChart weekId={week.id} />
        <WeeklyBarChart weekId={week.id} />
      </div>
      <HabitTracker weekId={week.id} />
      <DaysPreview weekId={week.id} />
    </main>
  );
}
