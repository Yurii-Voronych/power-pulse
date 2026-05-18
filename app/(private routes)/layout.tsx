import { pagesProtection } from "@/lib/server/auth/pagesProtection";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await pagesProtection();

  return <>{children} </>;
}
