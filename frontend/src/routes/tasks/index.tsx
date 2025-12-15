import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { TasksTable } from "@/components/TasksTable";
import {
  tasksQueryOptions,
  useAddTask,
  useToggleTask,
  useDeleteTask,
} from "@/queries/tasks.mutation";

export const Route = createFileRoute("/tasks/")({
  beforeLoad: () => {
    if (!localStorage.getItem("token")) {
      throw redirect({ to: "/login/login" });
    }
  },
  component: TasksPage,
});

function TasksPage() {
  const token = localStorage.getItem("token")!;
  const [title, setTitle] = useState("");

  const { data } = useQuery(
    tasksQueryOptions(token)
  );

  const addTask = useAddTask(token);
  const toggleTask = useToggleTask(token);
  const deleteTask = useDeleteTask(token);

  return (
    <div className="min-h-screen flex flex-col items-center pt-20">
      <h1 className="text-5xl font-bold tracking-[0.6em] bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-12">
        TODO
      </h1>

      <div className="w-[720px] flex gap-4 mb-10">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-6 py-4 rounded-xl
          bg-white text-gray-700
          border border-gray-300
          shadow-[0_0_25px_rgba(118,75,162,0.2),0_0_25px_rgba(80,125,214,0.2)]
          focus:border-blue-500
          focus:ring-2 focus:ring-blue-200
          outline-none"
        />

        <button
          onClick={() =>
            title.trim() &&
            addTask.mutate(title)
          }
          className="px-10 rounded-xl bg-blue-600 text-white"
        >
          Add
        </button>
      </div>

      <TasksTable
        tasks={data?.tasks || []}
        onToggle={(task) =>
          toggleTask.mutate(task)
        }
        onDelete={(id) =>
          deleteTask.mutate(id)
        }
      />
    </div>
  );
}
