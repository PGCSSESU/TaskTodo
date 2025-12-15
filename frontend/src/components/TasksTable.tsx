import { Check, X } from "lucide-react";

export function TasksTable({
  tasks,
  onToggle,
  onDelete,
}: {
  tasks: any[];
  onToggle: (task: any) => void;
  onDelete: (id: string) => void;
}) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div
      className="
        w-[720px] bg-white rounded-2xl p-6
        shadow-[0_0_35px_rgba(118,75,162,0.25),0_0_35px_rgba(80,125,214,0.25)]
      "
    >
      {sortedTasks.map((task, i) => (
        <div
          key={task._id}
          className={`
            group flex items-center justify-between py-4 px-2
            transition-all duration-300 ease-out
            hover:scale-[1.02] hover:-translate-y-[2px]
            hover:shadow-[0_10px_25px_rgba(118,75,162,0.25)]
            ${i !== sortedTasks.length - 1 ? "border-b" : ""}
          `}
        >
         
          <div className="flex items-center gap-4">
          
            <button
              onClick={() => onToggle(task)}
              className={`
                w-6 h-6 rounded-full flex items-center justify-center
                border-2 transition-all duration-300
                ${
                  task.completed
                    ? "bg-blue-500 border-blue-500"
                    : "border-blue-400 group-hover:border-blue-500"
                }
              `}
            >
              {task.completed && (
                <Check size={14} className="text-white" />
              )}
            </button>

            
            <span
              className={`
                text-lg transition-all duration-300
                ${
                  task.completed
                    ? "line-through  text-gray-400"
                    : "text-gray-800 group-hover:text-gray-900"
                }
              `}
            >
              {task.title}
            </span>
          </div>

        
          <button
            onClick={() => onDelete(task._id)}
            className="
              text-gray-400 opacity-70
              transition-all duration-300
              hover:text-gray-700 hover:scale-110
            "
          >
            <X size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
