import type { ActivityLevel, Sex } from "./profile";

export interface User {
  id: string;
  email: string;
  name: string;
  isProfileCompleted: boolean;
  profile?: {
    height?: number;
    currentWeight?: number;
    desiredWeight?: number;
    birthday?: string;
    sex?: Sex;
    levelActivity?: ActivityLevel;
  };
  dailyNorm?: {
    calories?: number;
    sportMinutes?: number;
  };
  createdAt: string;
  updatedAt: string;
}
