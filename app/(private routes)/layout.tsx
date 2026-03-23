import { withAuth } from "@/lib/auth/withAuth";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await withAuth();

  return <>{children} </>;
}
