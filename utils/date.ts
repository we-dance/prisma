import { format } from "date-fns";

export const formatDate = (date: Date, formatStr: string, locale: string) => {
  return format(date, formatStr);
};
