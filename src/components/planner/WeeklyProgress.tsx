"use client";

import { useEffect, useState } from "react";
import { getWeeklyProgress } from "@/lib/weeklyProgress";

export default function WeeklyProgress({
  weekId,
}: {
  weekId: string;
}) {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    getWeeklyProgress(weekId).then(setPercent);
  }, [weekId]);

  return (
    <div className="bg-blue-50 rounded-lg shadow-lg p-6 border border-blue-100 text-center" aria-label={`Weekly progress is ${percent}% completed`}>
      <h3 className="text-base font-semibold text-gray-800 mb-4">
        Weekly Progress
      </h3>
      <p className="text-5xl font-bold text-green-700 mt-4">
        {percent}%
      </p>
    </div>
  );
}