import { pagesProtection } from "@/lib/auth/pagesProtection";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await pagesProtection();

  return <>{children} </>;
}
