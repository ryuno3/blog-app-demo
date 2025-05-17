import { CredentialsSignInFormClient } from "./credentials-sign-in-form-client";
// import { getCsrfToken } from "next-auth/react" // NextAuth.js v5以降、CSRFトークンは通常不要

export async function CredentialsSignInForm() {
  return <CredentialsSignInFormClient />;
  // return <CredentialsSignInFormClient csrfToken={csrfToken} />;
}
