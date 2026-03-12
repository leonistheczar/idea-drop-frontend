import { loginUser } from "@/api/auth";
import { PasswordInput, FloatingInput } from "@/components/FloatingInput";
import { useAuth } from "@/context/authContext";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogIn, User } from "lucide-react";
import { useState } from "react";
export const Route = createFileRoute("/(auth)/login/")({
  head: () => ({
    meta: [{ title: "Login - IdeasDrop" }],
  }),
  component: IdeasLogin,
});

function IdeasLogin() {
  const navigate = useNavigate();
  const {setAccessToken, setUser} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {mutateAsync, isPending} = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setUser(data.user);
      navigate({to: "/user"})
    },
    onError: (data) => {
      setError(data.message);
    }
  });
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       await mutateAsync({email, password});
    } catch (err: any) {
        console.error(err.message);
    }
  }
  return (
        <div className="flex flex-col justify-center p-10">
          {error && (
              <p className="p-2 text-center bg-red-200 text-red-700 w-full rounded-md text-sm mb-2">{error}</p>
            )}
          <div className="flex items-center gap-2 mb-6 text-2xl">
            <User size={24} className="text-gray-700" />
            <h2 className="font-semibold text-gray-800">Login</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FloatingInput
              label="Enter Email"
              id="email"
              name="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label="Enter Password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 mt-2 p-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-gray-900 transition-colors cursor-pointer"
            >
              <LogIn size={15} />
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
  );
}
