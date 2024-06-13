


const calculateDuration  = (start: string, end: string) => {
    const startTime = Number(new Date(start));
    const endTime = Number(new Date(end));
    const durationInMilliseconds = endTime - startTime;
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    return durationInHours.toFixed(2); // Keep two decimal places for hours
  };

  export default calculateDuration