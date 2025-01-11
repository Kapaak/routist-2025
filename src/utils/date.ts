import dayjs from "dayjs";
import "dayjs/locale/cs";

export const convertDateToString = (date?: Date) => {
  dayjs.locale("cs");
  return date && dayjs(date).format("DD. MMMM YYYY");
};
