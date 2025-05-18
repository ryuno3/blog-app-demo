import { CredentialsSignInForm } from "./credentials-sign-in-form";
import Separator from "./separator";
import SignInCard from "./sign-in-card";
import SocialButton from "./social-button";
import { GoogleIcon } from "./provider-icons";
import Link from "next/link";
import { signIn } from "@/lib/auth/auth";

export default async function SignIn() {
  return (
    <SignInCard title="Sign In" description="Welcome back! Sign in to continue.">
      <div className="space-y-4">
        <SocialButton
          provider="google"
          icon={<GoogleIcon />}
          label="Sign in with Google"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" }); // Google認証を実行
          }}
        />
        {/* 他のソーシャルログインプロバイダーもここに追加可能 */}
      </div>
      <Separator />
      <CredentialsSignInForm />
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Sign up
        </Link>
      </p>
    </SignInCard>
  );
}
