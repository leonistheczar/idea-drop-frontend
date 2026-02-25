// components/FloatingInput.tsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type FloatingInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function FloatingInput({ label, id, ...props }: FloatingInputProps) {

  return (
    <div className="relative">
      <input
        id={id}
        placeholder=" "
        className="peer p-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-3 text-sm text-gray-400 transition-all
          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-gray-700 peer-focus:font-semibold peer-focus:bg-white peer-focus:px-1
          peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-gray-700 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
      >
        {label}
      </label>
    </div>
  );
}

export function PasswordInput({ label, id, ...props }: FloatingInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder=" "
        className="peer p-3 pr-10 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-3 text-sm text-gray-400 transition-all
          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-gray-700 peer-focus:font-semibold peer-focus:bg-white peer-focus:px-1
          peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-gray-700 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
      >
        {label}
      </label>
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}