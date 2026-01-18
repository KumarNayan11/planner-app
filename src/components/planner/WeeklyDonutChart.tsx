"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { getWeeklyProgress } from "@/lib/weeklyProgress";

const COLORS = ["#22c55e", "#e5e7eb"]; // green + gray

export default function WeeklyDonutChart({
  weekId,
}: {
  weekId: string;
}) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    getWeeklyProgress(weekId).then(setPercent);
  }, [weekId]);

  const data = [
    { name: "Done", value: percent },
    { name: "Left", value: 100 - percent },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <p className="text-sm text-gray-500 mb-2">Weekly Progress</p>

      <PieChart width={180} height={180}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>

      <p className="text-2xl font-bold text-green-600 mt-2">
        {percent}%
      </p>
    </div>
  );
}
