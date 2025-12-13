import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TasksTable } from "@/components/TasksTable";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/lib/api";

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
  const qc = useQueryClient();
  const [title, setTitle] = useState("");

  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(token),
  });

  const addTask = useMutation({
    mutationFn: () => createTask(token, { title }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
    },
  });

  const toggleTask = useMutation({
    mutationFn: (task: any) =>
      updateTask(token, task._id, { completed: !task.completed }),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(token, id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return (
    <>

      <div className="min-h-screen flex flex-col items-center pt-20">
        <h1 className="text-5xl font-bold tracking-[0.6em] bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-12">
          TODO
        </h1>
        <div className="w-[720px] flex gap-4 mb-10">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="
              flex-1 px-6 py-4 rounded-xl
              bg-white text-gray-700
              shadow-[0_0_25px_rgba(118,75,162,0.2),0_0_25px_rgba(80,125,214,0.2)]
              outline-none
            "
          />

          <button
            onClick={() => title.trim() && addTask.mutate()}
            className="
              px-10 rounded-xl text-white font-semibold
              bg-blue-600 hover:bg-blue-700 transition
            "
          >
            Add
          </button>
        </div>
        <TasksTable
          tasks={data?.tasks || []}
          onToggle={(task) => toggleTask.mutate(task)}
          onDelete={(id) => deleteTaskMutation.mutate(id)}
        />
      </div>
    </>
  );
}
