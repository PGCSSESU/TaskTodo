import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/lib/api";


export const tasksQueryOptions = (token: string) =>
  queryOptions({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(token),
  });
   
export function useAddTask(token: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (title: string) =>
      createTask(token, { title }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useToggleTask(token: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (task: any) =>
      updateTask(token, task._id, {
        completed: !task.completed,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}


export function useDeleteTask(token: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteTask(token, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
