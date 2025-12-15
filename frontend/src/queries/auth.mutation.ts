import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { loginUser, registerUser } from "@/lib/auth";
import { useAuth } from "@/components/context/AuthContext";


export function useRegisterMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      if (res?.token) {
        localStorage.setItem("token", res.token);
      }
      navigate({ to: "/tasks" }); 
    },
  });
}


export function useLoginMutation() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      setToken(res.token);
      navigate({ to: "/tasks" });
    },
  });
}