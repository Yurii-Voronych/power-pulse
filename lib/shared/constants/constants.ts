export const MEAL_TYPES = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
];

export const MIN_HEIGHT = 150;
export const MIN_WEIGHT = 35;
export const MIN_AGE = 18;
export const MAX_AGE = 100;

export const SEX_OPTIONS = ["male", "female"] as const;
export const ACTIVITY_LEVEL_VALUES = [1, 2, 3, 4, 5] as const;

export const ACTIVITY_LEVELS = [
  {
    value: ACTIVITY_LEVEL_VALUES[0],
    label: "Sedentary lifestyle (little or no physical activity)",
  },
  {
    value: ACTIVITY_LEVEL_VALUES[1],
    label: "Light activity (light exercises/sports 1-3 days per week)",
  },
  {
    value: ACTIVITY_LEVEL_VALUES[2],
    label: "Moderately active (moderate exercises/sports 3-5 days per week)",
  },
  {
    value: ACTIVITY_LEVEL_VALUES[3],
    label: "Very active (intense exercises/sports 6-7 days per week)",
  },
  {
    value: ACTIVITY_LEVEL_VALUES[4],
    label:
      "Extremely active (very strenuous exercises/sports and physical work)",
  },
] as const;
