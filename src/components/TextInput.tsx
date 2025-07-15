import cn from "@/utils/cn";

type Props = {
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({ label, className, ...props }: Props) {
  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <label className="label" htmlFor={props.name}>
        {label}
      </label>
      <input
        type="text"
        {...props}
        className={cn(
          "border border-gray-200 rounded w-full p-2",
          props.disabled && "cursor-not-allowed bg-gray-200"
        )}
      />
    </div>
  );
}
