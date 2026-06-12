import {
  ACTIVITY_LEVEL_VALUES,
  SEX_OPTIONS,
} from "@/lib/shared/constants/constants";

export type Sex = (typeof SEX_OPTIONS)[number];
export type ActivityLevel = (typeof ACTIVITY_LEVEL_VALUES)[number];
export type ActivityLevelValue = `${ActivityLevel}`;

export interface ProfileDetailsFormValues {
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
  sex: Sex | "";
  levelActivity: ActivityLevelValue | "";
}

export interface ProfileSettingsFormValues
  extends ProfileDetailsFormValues {
  name: string;
  email: string;
}

export interface ProfileSettingsInput {
  height: number;
  currentWeight: number;
  desiredWeight: number;
  birthday: Date;
  sex: Sex;
  levelActivity: ActivityLevel;
  name: string;
  email: string;
}
