// utility functions
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat)

// function to format a date into a specific string format
export const formatDate = (date: string | Date, format: string): string => {
  return dayjs(date).format(format);
};

export const parseDate = (dateString: string, format: string) => {
  return dayjs(dateString, format).toDate();
};

export const calcDateDiff = (date1: string, date2: string) => {
  const dayjsDate1 = dayjs(date1);
  const dayjsDate2 = dayjs(date2);
  return dayjsDate2.diff(dayjsDate1, "day");
};

export const addDays = (date: Date, days: number) => {
  return dayjs(date).add(days, "day").toDate();
};

export const getMidnight=(date: Date)=> {
return dayjs(date).startOf('day').toDate()
}

export const getDaysInMonth = (month: number, year: number) => {
  const startOfMonth = dayjs(new Date(year, month, 1));
  const endOfMonth = dayjs(new Date(year, month + 1, 0));

  const days = [];
  for (let day = startOfMonth; day.isBefore(endOfMonth) || day.isSame(endOfMonth); day = day.add(1, 'day')) {
    days.push(day);
  }

  return days;
};

// Example usage
// const formattedDate = formatDate('5/4/2024', 'YYYY-MM-DD HH:mm:ss');
// console.log(formattedDate); 

// const parsedDate = parseDate('2023-05-17 14:30:00', 'YYYY-MM-DD HH:mm:ss');
// console.log(parsedDate); 

// const dateDiff = calcDateDiff('2023-05-17', '2023-06-17');
// console.log(dateDiff); // 31

// const newDate = addDays(new Date(), 5);
// console.log(newDate); // Date object 5 days from today

// const midnightDate = getMidnight(new Date());
// console.log(midnightDate); // Date object set to midnight of the current day
