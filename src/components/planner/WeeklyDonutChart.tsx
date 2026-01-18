"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { getWeeklyProgress } from "@/lib/weeklyProgress";

const COLORS = ["#10b981", "#d1d5db"]; // green + gray

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
    <div className="bg-blue-50 rounded-lg shadow-lg p-6 border border-blue-100 flex flex-col items-center">
      <h3 className="text-base font-semibold text-gray-800 mb-4">
        Weekly Progress
      </h3>

      <div aria-label={`Donut chart showing ${percent}% weekly progress completed`}>
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
      </div>

      <p className="text-2xl font-bold text-green-700 mt-4">
        {percent}%
      </p>
    </div>
  );
}