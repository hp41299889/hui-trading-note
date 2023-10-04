"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`${session.user.id}/order`);
    }
  }, [session, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => signIn("google")}>登入</button>
    </main>
  );
};
export default Page;
