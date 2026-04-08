"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Body parts", value: "body-parts" },
  { label: "Muscles", value: "muscles" },
  { label: "Equipment", value: "equipment" },
];

export const ExercisesTabs = () => {
  const pathname = usePathname();

  return (
    <ul className="flex gap-4 mb-10">
      {TABS.map((tab) => {
        const isActive = pathname.includes(tab.value);
        return (
          <li key={tab.value}>
            <Link
              href={`/exercises/${tab.value}`}
              className={`pb-1 text-sm ${
                isActive
                  ? "text-white border-b-3 border-orange-1"
                  : "text-white/40"
              }`}
            >
              {tab.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
