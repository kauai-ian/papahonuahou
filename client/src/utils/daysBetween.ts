const calculateDaysBetween = (start: Date, end: Date): number => {
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const differenceInTime = endDate - startDate;
    const differenceInDays = Math.ceil(differenceInTime / oneDay);
    return differenceInDays;
  };
  export default calculateDaysBetween