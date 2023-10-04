import dayjs, { Dayjs } from "dayjs";

type Time = string | number | Dayjs | Date;

export const toLocale = (time: Time) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};
