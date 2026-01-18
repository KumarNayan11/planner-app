"use client";

import { useEffect, useState } from "react";
import { getOrCreateCurrentWeek } from "@/lib/week";
import { Week } from "@/types/week";
import WeekEditor from "@/components/planner/WeekEditor";
import WeeklyProgress from "@/components/planner/WeeklyProgress";
import DaysPreview from "@/components/planner/DaysPreview";
import HabitTracker from "@/components/planner/HabitTracker";

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
      <WeeklyProgress weekId={week.id} />
      <HabitTracker weekId={week.id} />
      <DaysPreview weekId={week.id} />
    </main>
  );
}
