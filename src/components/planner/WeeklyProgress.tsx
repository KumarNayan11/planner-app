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
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <p className="text-sm text-gray-500">Weekly Progress</p>
      <p className="text-4xl font-bold text-green-600">
        {percent}%
      </p>
    </div>
  );
}
