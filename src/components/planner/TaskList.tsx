"use client";

import { useEffect, useState } from "react";
import { addTask, getTasksForDay, toggleTask } from "@/lib/tasks";
import { Task } from "@/types/task";

export default function TaskList({
  weekId,
  day,
}: {
  weekId: string;
  day: string;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
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
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createTask}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {tasks.map((task) => (
        <label
          key={task.id}
          className="flex items-center gap-2"
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              toggleTask(task.id, !task.completed).then(load)
            }
          />
          <span
            className={
              task.completed ? "line-through text-gray-500" : ""
            }
          >
            {task.title}
          </span>
        </label>
      ))}
    </div>
  );
}
