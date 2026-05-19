import { differenceInYears } from "date-fns";

type Params = {
  height: number;
  currentWeight: number;
  birthday: Date;
  sex: "male" | "female";
  levelActivity: 1 | 2 | 3 | 4 | 5;
};

const activityMap = {
  1: 1.2,
  2: 1.375,
  3: 1.55,
  4: 1.725,
  5: 1.9,
};

export const calculateDailyNorm = ({
  height,
  currentWeight,
  birthday,
  sex,
  levelActivity,
}: Params) => {
  const age = differenceInYears(new Date(), birthday);

  const activity = activityMap[levelActivity];

  let bmr = 0;

  if (sex === "male") {
    bmr = (10 * currentWeight + 6.25 * height - 5 * age + 5) * activity;
  } else {
    bmr = (10 * currentWeight + 6.25 * height - 5 * age - 161) * activity;
  }

  return {
    calories: Math.round(bmr),
    sportMinutes: 110,
  };
};
