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

  if (!week) return <div className="p-6">Loading...</div>;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        {day.toUpperCase()}
      </h1>

      <TaskList weekId={week.id} day={day} />
    </main>
  );
}
