import { ReactNode } from "react";

interface SignInCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function SignInCard({ title, description, children }: SignInCardProps) {
  return (
    <div className="mx-auto w-full max-w-md p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
