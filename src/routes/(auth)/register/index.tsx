import { FloatingInput, PasswordInput } from '@/components/FloatingInput'
import { useAuth } from '@/context/authContext'
import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { LogIn, UserPlus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/api/auth'

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
  const navigate = useNavigate();
  const {setAccessToken, setUser} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {mutateAsync, isPending} = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate({to: "/ideas"});
    }
  });
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutateAsync({name, email, password});
    } catch (err: any) {
      setError(err.message);
    }
  }
  return (
        <div className="flex flex-col justify-center p-10">
            {error && (
              <p className="p-2 text-center bg-red-200 text-red-700 w-full rounded-md text-sm mb-2">{error}</p>
            )}
          <div className="flex items-center gap-2 mb-6 text-2xl">
            <UserPlus size={24} className="text-gray-700" />
            <h2 className="font-semibold text-gray-800">Register</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FloatingInput
              label="Enter Name"
              id="name"
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            {isPending ? "Registering..." : "Register"}
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
