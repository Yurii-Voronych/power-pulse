import { User } from "../types/user";

type SerializableDate = Date | string | null | undefined;

type UserDTOInput = {
  _id: { toString: () => string };
  email: string;
  name: string;
  isProfileCompleted: boolean;
  profile?: {
    height?: number;
    currentWeight?: number;
    desiredWeight?: number;
    birthday?: SerializableDate;
    blood?: number;
    sex?: string;
    levelActivity?: number;
  };
  dailyNorm?: {
    calories?: number;
    sportMinutes?: number;
  };
  createdAt?: SerializableDate;
  updatedAt?: SerializableDate;
};

const serializeDate = (date: SerializableDate) => {
  if (!date) return undefined;
  return typeof date === "string" ? date : date.toISOString();
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
        birthday: serializeDate(user.profile.birthday),
        blood: user.profile.blood,
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
  createdAt: serializeDate(user.createdAt),
  updatedAt: serializeDate(user.updatedAt),
});
