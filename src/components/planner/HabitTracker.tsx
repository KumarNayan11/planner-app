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
  const [adding, setAdding] = useState(false);

  async function load() {
    setHabits(await getHabits(weekId));
  }

  useEffect(() => {
    load();
  }, [weekId]);

  async function createHabit() {
    if (!name.trim()) return;
    setAdding(true);
    await addHabit(weekId, name.trim());
    setName("");
    setAdding(false);
    load();
  }

  return (
    <section className="bg-[var(--green-light)] rounded-xl shadow-md p-5 space-y-5">
      <h3 className="text-lg font-semibold text-gray-700">
        Habits
      </h3>

      {/* Add Habit */}
      <div className="flex gap-2">
        <input
          className="flex-1 border border-green-300 p-2 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-green-400
                     bg-white"
          placeholder="New habit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={createHabit}
          disabled={adding}
          className={`px-4 rounded-md text-white transition
            ${
              adding
                ? "bg-[var(--green-main)] opacity-60 cursor-not-allowed"
                : "bg-[var(--green-main)] hover:opacity-90"
            }
          `}
        >
          Add
        </button>
      </div>

      {/* Habit List */}
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id}>
            <p className="text-sm font-medium text-gray-700">
              {habit.name}
            </p>

            <div className="flex gap-1 mt-2">
              {DAYS.map((day) => {
                const active = habit.days.includes(day);

                return (
                  <button
                    key={day}
                    onClick={() =>
                      toggleHabitDay(habit.id, day, habit.days).then(load)
                    }
                    className={`w-7 h-7 rounded-full text-xs font-semibold
                      transition
                      ${
                        active
                          ? "bg-[var(--green-main)] text-white"
                          : "bg-white border border-green-300 text-gray-400"
                      }
                    `}
                    title={day.toUpperCase()}
                  >
                    ✓
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {habits.length === 0 && (
          <p className="text-sm text-gray-500">
            No habits added yet.
          </p>
        )}
      </div>
    </section>
  );
}
