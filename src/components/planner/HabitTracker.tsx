"use client";

import { useEffect, useState } from "react";
import { addHabit, getHabits, toggleHabitDay } from "@/lib/habits";
import { Habit } from "@/types/habit";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default function HabitTracker({
  weekId,
}: {
  weekId: string;
}) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState("");

  async function load() {
    setHabits(await getHabits(weekId));
  }

  useEffect(() => {
    load();
  }, [weekId]);

  async function createHabit() {
    if (!name.trim()) return;
    await addHabit(weekId, name);
    setName("");
    load();
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <h3 className="font-semibold">Habits</h3>

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="New habit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={createHabit}
          className="bg-green-600 text-white px-3 rounded"
        >
          Add
        </button>
      </div>

      {habits.map((habit) => (
        <div key={habit.id}>
          <p className="text-sm font-medium">{habit.name}</p>
          <div className="flex gap-1 mt-1">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() =>
                  toggleHabitDay(habit.id, day, habit.days).then(load)
                }
                className={`w-6 h-6 rounded text-xs ${
                  habit.days.includes(day)
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                ✓
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
