import { signOut } from "@/lib/auth/auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded">
        Sign Out
      </button>
    </form>
  );
}
