import { redirect } from "next/navigation";

export default function Page() {
  const today = new Date().toISOString().split("T")[0];
  redirect(`/diary/${today}`);
}
