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
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-sm text-gray-500 mb-2">
        Daily Completion
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
