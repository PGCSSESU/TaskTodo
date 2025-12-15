import { useForm } from "@tanstack/react-form";

export function useLoginForm(
  onSubmit: (values: {
    email: string;
    password: string;
  }) => void
) {
  return useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });
}
