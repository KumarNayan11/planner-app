"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDayProgress } from "@/lib/progress";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default function DaysPreview({ weekId }: { weekId: string }) {
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    async function load() {
      const data: Record<string, number> = {};
      for (const day of DAYS) {
        data[day] = await getDayProgress(weekId, day);
      }
      setProgress(data);
    }

    load();
  }, [weekId]);

  return (
    <section className="bg-blue-50 rounded-xl shadow-lg p-6 space-y-6 border border-blue-100">
      <h3 className="text-xl font-semibold text-gray-800">
        Daily Progress
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
        {DAYS.map((day) => {
          const value = progress[day] ?? 0;

          return (
            <Link
              key={day}
              href={`/day/${day}`}
              className="bg-white rounded-xl shadow-sm p-6
                         flex flex-col items-center justify-center
                         hover:shadow-lg hover:bg-blue-50 transition-all duration-200
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`${day.charAt(0).toUpperCase() + day.slice(1)}: ${value}% completed`}
            >
              {/* Day label */}
              <p className="text-base font-medium text-gray-700 capitalize mb-2">
                {day}
              </p>

              {/* Percentage */}
              <p className="text-3xl font-bold text-green-700">
                {value}%
              </p>

              {/* Subtitle */}
              <p className="text-sm text-gray-600 mt-2">
                completed
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}