type FloatingInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function FloatingMessageInput({ label, id, ...props }: FloatingInputProps) {

  return (
    <div className="relative">
      <textarea
        id={id}
        placeholder=" "
        className="peer p-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
        {...props}
        cols={10}
        rows={5}
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