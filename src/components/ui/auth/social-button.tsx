import { ReactNode } from "react";

interface SocialButtonProps {
  provider: string;
  icon: ReactNode;
  label: string;
  action: () => Promise<void>;
}

export default function SocialButton({ provider, icon, label, action }: SocialButtonProps) {
  return (
    <form action={action} className="w-full">
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-zinc-700 dark:text-zinc-100 dark:ring-zinc-600 dark:hover:bg-zinc-600"
      >
        {icon}
        <span>{label}</span>
      </button>
    </form>
  );
}
