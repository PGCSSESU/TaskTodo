import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useLoginMutation } from "@/queries/auth.mutation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate(value);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 bg-white rounded-2xl px-10 py-8
          shadow-[0_0_35px_rgba(118,75,162,0.25),0_0_35px_rgba(80,125,214,0.25)]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Sign In
          </CardTitle>
        </CardHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <CardContent className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-2">Email</Label>
              <form.Field name="email">
                {(field) => (
                  <Input
                    type="email"
                    value={field.state.value}
                    className="h-12 rounded-xl bg-gray-100 border-none"
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                )}
              </form.Field>
            </div>

            <div>
              <Label className="block text-sm font-medium mb-2">Password</Label>
              <form.Field name="password">
                {(field) => (
                  <Input
                    type="password"
                    className="h-12 rounded-xl bg-gray-100 border-none"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                )}
              </form.Field>
            </div>

            {loginMutation.isError && (
              <p className="text-red-600 text-sm">
                {(loginMutation.error as Error).message}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-12 rounded-xl mt-4 border-none"
            >
              {loginMutation.isPending
                ? "Signing In..."
                : "Sign In"}
            </Button>

            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() =>
                  navigate({ to: "/register" })
                }
              >
                Register
              </span>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
