import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <>

      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className="
            w-full max-w-3xl
            bg-white
            rounded-2xl
            shadow-[0_0_40px_rgba(99,102,241,0.15)]
            p-10
            text-center
          "
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Simple Task Manager
          </h1>

          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            Organize your day. Achieve more. Start by creating your account.
          </p>
          <Button
            onClick={() =>
              navigate({ to: token ? "/tasks" : "/register" })
            }
            className="
              w-full
              h-14
              rounded-full
              bg-black
              text-white
              text-lg
              font-semibold
              hover:bg-gray-900
              transition
            "
          >
            {token ? "Go to Tasks" : "Register to Start"}
          </Button>
        </div>
      </div>
    </>
  );
}
