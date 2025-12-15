import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRegisterMutation } from "@/queries/auth.mutation";
import { useRegisterForm } from "@/forms/register.form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/register/")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const form = useRegisterForm((values) => {
    registerMutation.mutate(values);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="
          w-[420px] bg-white rounded-2xl px-10 py-8
          shadow-[0_0_35px_rgba(118,75,162,0.25),0_0_35px_rgba(80,125,214,0.25)]
        "
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h2>

        <form.Field name="name">
          {(field) => (
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value)
                }
                className="h-12 rounded-xl bg-gray-100 border-none"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                type="email"
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value)
                }
                className="h-12 rounded-xl bg-gray-100 border-none"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                type="password"
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value)
                }
                className="h-12 rounded-xl bg-gray-100 border-none"
              />
            </div>
          )}
        </form.Field>

        {registerMutation.isError && (
          <p className="text-red-600 text-sm mb-4">
            {(registerMutation.error as Error).message}
          </p>
        )}

        <Button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full h-12 rounded-full bg-black text-white"
        >
          {registerMutation.isPending
            ? "Signing In"
            : "Sign Up"}
        </Button>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer underline"
            onClick={() =>
              navigate({ to: "/login/login" })
            }
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
