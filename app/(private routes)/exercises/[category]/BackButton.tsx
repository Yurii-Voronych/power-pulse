"use client";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return <button onClick={() => router.back()}>← Back</button>;
};
