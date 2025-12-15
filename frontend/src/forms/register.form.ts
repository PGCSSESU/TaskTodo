import { useForm } from "@tanstack/react-form";

export function useRegisterForm(
  onSubmit: (values: {
    name: string;
    email: string;
    password: string;
  }) => void
) {
  return useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });
}
