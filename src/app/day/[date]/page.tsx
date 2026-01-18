"use client";

import { useParams } from "next/navigation";
import TaskList from "@/components/planner/TaskList";
import { getOrCreateCurrentWeek } from "@/lib/week";
import { useEffect, useState } from "react";
import { Week } from "@/types/week";

export default function DayPage() {
  const params = useParams();
  const day = params.date as string;

  const [week, setWeek] = useState<Week | null>(null);

  useEffect(() => {
    getOrCreateCurrentWeek().then(setWeek);
  }, []);

  if (!week) return <div className="p-8 text-center text-gray-600" aria-live="polite">Loading...</div>;

  return (
    <main className="max-w-2xl mx-auto bg-blue-50 rounded-xl shadow-lg p-8 space-y-6 border border-blue-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {day.toUpperCase()}
      </h1>

      <TaskList weekId={week.id} day={day} />
    </main>
  );
}