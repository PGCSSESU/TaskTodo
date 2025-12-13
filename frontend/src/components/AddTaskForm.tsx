import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddTaskForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const form = useForm({
    defaultValues: {
      title: "",
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
      form.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex gap-2"
    >
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) =>
            !value ? "Task title is required" : undefined,
        }}
      >
        {(field) => (
          <Input
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="Add a new task..."
          />
        )}
      </form.Field>
      <Button type="submit" className="transition-transform duration-300 hover:scale-105 active:scale-95" // Scale up on hover, slightly smaller on click
      variant="default">Add</Button>
    </form>
  );
}
