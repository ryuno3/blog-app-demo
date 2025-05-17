import SignInCard from "./sign-in-card"; // SignInCardを再利用
import { SignUpFormClient } from "./sign-up-form-client";
import Link from "next/link";

export default async function SignUp() {
  return (
    <SignInCard title="Create Account" description="Join us! Create an account to get started.">
      <SignUpFormClient />
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Sign in
        </Link>
      </p>
    </SignInCard>
  );
}
