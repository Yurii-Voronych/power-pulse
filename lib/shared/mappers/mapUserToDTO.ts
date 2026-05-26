import { User } from "../types/user";

type UserDTOInput = {
  _id: { toString: () => string };
  email: string;
  name: string;
  isProfileCompleted: boolean;
  profile?: {
    height?: number;
    currentWeight?: number;
    desiredWeight?: number;
    birthday?: Date;
    sex?: string;
    levelActivity?: number;
  };
  dailyNorm?: {
    calories?: number;
    sportMinutes?: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export const mapUserToDTO = (user: UserDTOInput): User => ({
  id: user._id.toString(),
  email: user.email,
  name: user.name,
  isProfileCompleted: user.isProfileCompleted,
  profile: user.profile
    ? {
        height: user.profile.height,
        currentWeight: user.profile.currentWeight,
        desiredWeight: user.profile.desiredWeight,
        birthday: user.profile.birthday?.toISOString(),
        sex: user.profile.sex,
        levelActivity: user.profile.levelActivity,
      }
    : undefined,
  dailyNorm: user.dailyNorm
    ? {
        calories: user.dailyNorm.calories,
        sportMinutes: user.dailyNorm.sportMinutes,
      }
    : undefined,
  createdAt: user.createdAt.toISOString(),
  updatedAt: user.updatedAt.toISOString(),
});
