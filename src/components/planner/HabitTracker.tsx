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
    <section className="bg-blue-50 rounded-xl shadow-lg p-6 space-y-6 border border-blue-100">
      <h3 className="text-xl font-semibold text-gray-800">
        Habits
      </h3>

      {/* Add Habit */}
      <div className="flex gap-3">
        <input
          className="flex-1 border border-gray-300 p-3 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     bg-white text-gray-900 placeholder-gray-500"
          placeholder="New habit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Enter new habit name"
        />
        <button
          onClick={createHabit}
          disabled={adding}
          className={`px-5 py-3 rounded-lg text-white font-medium transition-all duration-200
            border border-blue-700
            ${
              adding
                ? "bg-blue-400 opacity-60 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }
          `}
          aria-label={adding ? "Adding habit..." : "Add new habit"}
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Habit List */}
      <div className="space-y-5">
        {habits.map((habit) => (
          <div key={habit.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-base font-medium text-gray-800 mb-3">
              {habit.name}
            </p>

            <div className="flex gap-2" role="group" aria-label={`Toggle days for ${habit.name}`}>
              {DAYS.map((day) => {
                const active = habit.days.includes(day);

                return (
                  <button
                    key={day}
                    onClick={() =>
                      toggleHabitDay(habit.id, day, habit.days).then(load)
                    }
                    className={`w-10 h-10 rounded-full text-sm font-semibold
                      transition-all duration-200 flex items-center justify-center
                      ${
                        active
                          ? "bg-green-500 text-white border-2 border-green-600 hover:bg-green-600"
                          : "bg-gray-100 border-2 border-gray-300 text-gray-600 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
                      }
                    `}
                    title={`${day.toUpperCase()}: ${active ? "Completed" : "Not completed"}`}
                    aria-label={`Toggle ${day.toUpperCase()} for ${habit.name}`}
                    aria-pressed={active}
                  >
                    {active ? "✓" : ""}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {habits.length === 0 && (
          <p className="text-sm text-gray-600 italic text-center py-4">
            No habits added yet. Start by adding one above!
          </p>
        )}
      </div>
    </section>
  );
}