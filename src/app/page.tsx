import Header from "@/components/layout/header";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="">
      <Header />
      <main>
        <h1>Welcome to the Blog</h1>
        <p>This is a simple blog application built with Next.js and Prisma.</p>
      </main>
    </div>
  );
}
