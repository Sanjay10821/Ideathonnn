import { cn } from "../../lib/utils";


export function Button({
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition",
        className
      )}
      {...props}
    />
  );
}
