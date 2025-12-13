import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";

export function Navbar() {
  const navigate = useNavigate();
  const { token, setToken } = useAuth(); 

  function logout() {
    localStorage.removeItem("token");
    setToken(null); 
    navigate({ to: "/" });
  }

  return (
    <nav className="w-full flex justify-center py-6">
      <div
        className="
          flex items-center gap-6 px-8 py-4 rounded-2xl
          bg-white shadow-[0_0_25px_rgba(118,75,162,0.18),0_0_25px_rgba(80,125,214,0.18)]
        "
      >
        <Link to="/" className="font-semibold text-gray-800 hover:text-black">
          Home
        </Link>

        {!token && (
          <>
            <Link
              to="/login/login"
              className="text-gray-700 hover:text-black"
            >
              Sign In
            </Link>
          </>
        )}

        {token && (
          <>
            <Link
              to="/tasks"
              className="text-gray-700 hover:text-black"
            >
              Tasks
            </Link>

            <Button
              variant="ghost"
              onClick={logout}
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
