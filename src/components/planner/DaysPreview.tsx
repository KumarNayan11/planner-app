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
    <section className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-700">
        Daily Progress
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {DAYS.map((day) => {
          const value = progress[day] ?? 0;

          return (
            <Link
              key={day}
              href={`/day/${day}`}
              className="bg-white rounded-xl shadow-sm p-4
                         flex flex-col items-center justify-center
                         hover:shadow-md transition"
            >
              {/* Day label */}
              <p className="text-sm font-medium text-gray-600 capitalize mb-1">
                {day}
              </p>

              {/* Percentage */}
              <p className="text-2xl font-semibold text-[var(--green-main)]">
                {value}%
              </p>

              {/* Subtitle */}
              <p className="text-xs text-gray-500 mt-1">
                completed
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
