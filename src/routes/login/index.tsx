import { PasswordInput, FloatingInput } from "@/components/FloatingInput";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LogIn, User } from "lucide-react";
export const Route = createFileRoute("/login/")({
  head: () => ({
    meta: [{ title: "Login - IdeasDrop" }],
  }),
  component: IdeasLogin,
});

function IdeasLogin() {
  return (
    <section className="flex items-center justify-center mt-4 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-100 grid sm:grid-cols-2">
        {/* Left: Brand */}
        <div className="flex flex-col justify-between p-10">
          <div>
            <img className="w-24 h-24" src="/main-logo.svg" alt="IdeasDrop" />
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Ideas Drop
            </h1>
            <p className="mt-2 text-md text-gray-500 leading-relaxed">
              Share, explore, and build on the best startup ideas and side
              hustles.
            </p>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} IdeasDrop
          </p>
        </div>

        {/* Right: Form */}
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
      </div>
    </section>
  );
}
