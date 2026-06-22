import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import { redirect } from "next/navigation";
import AuthProvider from "@/providers/AuthProvider";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }
  return <AuthProvider initialUser={user}>{children}</AuthProvider>;
}
