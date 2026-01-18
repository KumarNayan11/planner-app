"use client";

import { useEffect, useState } from "react";
import { getOrCreateCurrentWeek } from "@/lib/week";
import { Week } from "@/types/week";

import WeekEditor from "@/components/planner/WeekEditor";
import DaysPreview from "@/components/planner/DaysPreview";
import HabitTracker from "@/components/planner/HabitTracker";
import WeeklyDonutChart from "@/components/planner/WeeklyDonutChart";
import WeeklyBarChart from "@/components/planner/WeeklyBarChart";

export default function Home() {
  const [week, setWeek] = useState<Week | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getOrCreateCurrentWeek()
      .then(setWeek)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading planner...</div>;
  }

  if (!week) {
    return (
      <div className="p-6 text-red-500">
        Failed to load week
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800">
        Weekly Planner
      </h1>

      {/* Weekly setup */}
      <WeekEditor week={week} />

      {/* Progress charts */}
      <section className="bg-white rounded-xl shadow-md p-5 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Overall Progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WeeklyDonutChart weekId={week.id} />
          <WeeklyBarChart weekId={week.id} />
        </div>
      </section>

      {/* Habits */}
      <HabitTracker weekId={week.id} />

      {/* Daily progress */}
      <DaysPreview weekId={week.id} />
    </main>
  );
}
