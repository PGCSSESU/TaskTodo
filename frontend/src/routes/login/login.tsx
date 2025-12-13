import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import { loginUser } from "@/lib/auth";
import { useAuth } from "@/components/context/AuthContext";

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
  const { setToken } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      setToken(res.token);
      navigate({ to: "/tasks" });
    },
  });


  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      loginMutation.mutate(value);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card
        className="w-full max-w-md shadow-xl rounded-2xl bg-white p-6"
        style={{
          borderRadius: "6px",
          boxShadow:
            "0 0 25px rgba(118, 75, 162, 0.2), 0 0 25px rgba(80, 125, 214, 0.2)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900">
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
              <Label className="text-gray-700 py-1.5">Email</Label>
              <form.Field
                name="email"
                children={(field) => (
                  <Input
                    type="email"
                    className="bg-gray-100 rounded-xl px-4 py-3"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                )}
              />
            </div>

         
            <div>
              <Label className="text-gray-700 py-1.5">Password</Label>
              <form.Field
                name="password"
                children={(field) => (
                  <Input
                    type="password"
                    className="bg-gray-100 rounded-xl px-4 py-3"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                )}
              />
            </div>
            {loginMutation.isError && (
              <p className="text-red-600 text-sm">
                {(loginMutation.error as any)?.message ||
                  "Login failed"}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full py-3 rounded-xl mt-5 bg-black text-white hover:bg-gray-900"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending
                ? "Signing In..."
                : "Sign In"}
            </Button>

            <p className="text-sm text-center text-gray-600 ">
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => navigate({ to: "/register" })}
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
