"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getWeeklyBarData } from "@/lib/weeklyBars";

export default function WeeklyBarChart({
  weekId,
}: {
  weekId: string;
}) {
  const [data, setData] = useState<
    { day: string; value: number }[]
  >([]);

  useEffect(() => {
    getWeeklyBarData(weekId).then(setData);
  }, [weekId]);

  return (
    <div className="bg-blue-50 rounded-lg shadow-lg p-6 border border-blue-100">
      <h3 className="text-base font-semibold text-gray-800 mb-4">
        Daily Completion
      </h3>

      <ResponsiveContainer width="100%" height={200} aria-label="Bar chart showing daily completion percentages for the week">
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}