import { validateSession } from "@/lib/server/auth/validateSession";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateSession();

  if (!session) {
    redirect("/auth/login");
  }
  return <>{children} </>;
}
