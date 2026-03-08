import { FloatingInput, PasswordInput } from '@/components/FloatingInput'
import { createFileRoute, Link } from '@tanstack/react-router'
import { LogIn, UserPlus } from 'lucide-react'

export const Route = createFileRoute('/(auth)/register/')({
  head: () => ({
    meta:[
      {
        title: "Register - IdeasDrop"
      }
    ],
  }),
  component: IdeasRegister,
})

function IdeasRegister() {
  return (
        <div className="flex flex-col justify-center p-10">
          <div className="flex items-center gap-2 mb-6 text-2xl">
            <UserPlus size={24} className="text-gray-700" />
            <h2 className="font-semibold text-gray-800">Register</h2>
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
            <PasswordInput
              label="Confirm Password"
              id="confirm-password"
              name="confirm-password"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 mt-2 p-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-gray-900 transition-colors cursor-pointer"
            >
              <LogIn size={15} />
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-400">
            Already a user?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
  )
}
