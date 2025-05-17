import SignIn from "@/components/ui/auth/sign-in";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">ブログアプリ</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          サインインして投稿を始めましょう
        </p>
      </div>
      <SignIn />
      <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-500">
        &copy; {new Date().getFullYear()} ブログアプリ. All rights reserved.
      </p>
    </div>
  );
}
