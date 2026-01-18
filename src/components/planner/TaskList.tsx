"use client";

import { useEffect, useState } from "react";
import { addTask, getTasksForDay, toggleTask } from "@/lib/tasks";
import { TaskWithId } from "@/types/task";

export default function TaskList({
  weekId,
  day,
}: {
  weekId: string;
  day: string;
}) {
  const [tasks, setTasks] = useState<TaskWithId[]>([]);
  const [title, setTitle] = useState("");

  async function load() {
    const data = await getTasksForDay(weekId, day);
    setTasks(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function createTask() {
    if (!title.trim()) return;
    await addTask(weekId, day, title);
    setTitle("");
    load();
  }

  return (
    <div className="bg-blue-50 rounded-lg shadow-lg p-6 space-y-6 border border-blue-100">
      <div className="flex gap-3 mb-4">
        <input
          className="flex-1 border border-gray-300 p-3 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     bg-white text-gray-900 placeholder-gray-500"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Enter new task title"
        />
        <button
          onClick={createTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-all duration-200
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Add new task"
        >
          Add
        </button>
      </div>

      <fieldset className="space-y-4">
        <legend className="sr-only">Task List for {day}</legend>
        {tasks.map((task) => (
          <label
            key={task.id}
            className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                toggleTask(task.id, !task.completed).then(load)
              }
              className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-blue-500"
              aria-label={`Mark ${task.title} as ${
                task.completed ? "incomplete" : "complete"
              }`}
            />
            <span
              className={`text-base font-medium ${
                task.completed
                  ? "line-through text-gray-500"
                  : "text-gray-800"
              }`}
            >
              {task.title}
            </span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}
