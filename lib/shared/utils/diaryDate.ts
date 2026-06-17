import { addDays, format, isAfter, isBefore, isValid, parse } from "date-fns";
import { DIARY_DATE_FORMAT } from "../constants/constants";

const MAX_FUTURE_DAYS = 7;

export type DiaryDateValidationResult =
  | { status: "valid" }
  | { status: "invalid" }
  | { status: "redirect"; date: string };

export const formatDiaryDate = (date: Date) => {
  return format(date, DIARY_DATE_FORMAT);
};

export const parseDiaryDate = (date: string) => {
  return parse(date, DIARY_DATE_FORMAT, new Date());
};

export const isValidDiaryDateFormat = (date: string) => {
  const parsedDate = parseDiaryDate(date);

  return isValid(parsedDate) && formatDiaryDate(parsedDate) === date;
};

export const getDiaryDateRange = (userCreatedAt: string) => {
  return {
    minDate: formatDiaryDate(new Date(userCreatedAt)),
    maxDate: formatDiaryDate(addDays(new Date(), MAX_FUTURE_DAYS)),
  };
};

export const validateDiaryDate = (
  date: string,
  range: { minDate: string; maxDate: string },
): DiaryDateValidationResult => {
  if (!isValidDiaryDateFormat(date)) {
    return { status: "invalid" };
  }

  const parsedDate = parseDiaryDate(date);
  const minDate = parseDiaryDate(range.minDate);
  const maxDate = parseDiaryDate(range.maxDate);

  if (isBefore(parsedDate, minDate)) {
    return { status: "redirect", date: range.minDate };
  }

  if (isAfter(parsedDate, maxDate)) {
    return { status: "redirect", date: range.maxDate };
  }

  return { status: "valid" };
};
