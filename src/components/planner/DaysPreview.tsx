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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {DAYS.map((day) => (
        <Link
          key={day}
          href={`/day/${day}`}
          className="border rounded p-3 text-center bg-gray-50 hover:bg-gray-100 transition"
        >
          <p className="font-medium capitalize">{day}</p>
          <p className="text-sm text-gray-500">
            {progress[day] ?? 0}% done
          </p>
        </Link>
      ))}
    </div>
  );
}
