export default function Separator() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-zinc-700" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-2 text-gray-500 dark:bg-zinc-800 dark:text-zinc-400">
          または
        </span>
      </div>
    </div>
  );
}
