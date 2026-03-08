import { PasswordInput, FloatingInput } from "@/components/FloatingInput";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LogIn, User } from "lucide-react";
export const Route = createFileRoute("/(auth)/login/")({
  head: () => ({
    meta: [{ title: "Login - IdeasDrop" }],
  }),
  component: IdeasLogin,
});

function IdeasLogin() {
  return (
        <div className="flex flex-col justify-center p-10">
          <div className="flex items-center gap-2 mb-6 text-2xl">
            <User size={24} className="text-gray-700" />
            <h2 className="font-semibold text-gray-800">Login</h2>
          </div>
          <form className="flex flex-col gap-4">
            <FloatingInput
              label="Enter Email"
              id="email"
              name="email"
              type="text"
              required
            />
            <PasswordInput
              label="Enter Password"
              id="password"
              name="password"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 mt-2 p-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-gray-900 transition-colors cursor-pointer"
            >
              <LogIn size={15} />
              Login
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
