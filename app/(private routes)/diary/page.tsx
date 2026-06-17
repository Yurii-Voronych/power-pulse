import { DIARY_DATE_FORMAT } from "@/lib/shared/constants/constants";
import { format } from "date-fns";
import { redirect } from "next/navigation";

export default function Page() {
  const today = format(new Date(), DIARY_DATE_FORMAT);
  redirect(`/diary/${today}`);
}
