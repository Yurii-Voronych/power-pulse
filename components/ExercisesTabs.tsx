"use client";

import { useRouter, useSearchParams } from "next/navigation";

const TABS = ["Body parts", "Muscles", "Equipment"];

export const ExercisesTabs = () => {
  const router = useRouter();
  const params = useSearchParams();

  const activeTab = params.get("filter") || "Body parts";

  const handleChange = (tab: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("filter", tab);

    router.push(`?${newParams.toString()}`);
  };

  return (
    <ul className="flex gap-4 mb-10">
      {TABS.map((tab) => {
        const isActive = tab === activeTab;

        return (
          <li key={tab}>
            <button
              onClick={() => handleChange(tab)}
              className={`pb-1 text-sm ${
                isActive
                  ? "text-white border-b-3 border-orange-1"
                  : "text-white/40 "
              }`}
            >
              {tab}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
