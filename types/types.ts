export interface User {
  id: string;
  email: string;
  name: string;
  isProfileCompleted: boolean;
  profile?: {
    height: number;
    currentWeight: number;
    desiredWeight: number;
    birthday: Date;
    blood: number;
    sex: string;
    levelActivity: number;
  };
  dailyNorm?: {
    calories: number;
    sportMinutes: number;
  };
}
