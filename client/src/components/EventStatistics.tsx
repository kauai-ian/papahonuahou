// display event statistics
import React, { useEffect, useState } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { getStatistics } from "../api/events"; // Ensure you have the correct path to your API functions

export type Statistic = {
  totalEvents: number;
  totalSleepTime: number;
  totalSleepEvents: number;
  totalNapTime: number;
  totalNapEvents: number;
  totalMealEvents: number;
  averageSleepTime: number;
  averageNapTime: number;
};

type StatisticsComponentProps = {
  filter: {
    eventType: string;
    eventStart: Date;
    eventEnd: Date;
  };
};

const StatisticsComponent: React.FC<StatisticsComponentProps> = ({
  filter,
}) => {
  const [statistics, setStatistics] = useState<Statistic | null>(null); // state management for stats
  const [loading, setLoading] = useState<boolean>(true); // loading

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStatistics(filter);
        console.log("Statistics data:", response.data);

        setStatistics(response.data);
      } catch (error) {
        console.error("failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [filter]);
  // try to filter for event type of sleep, event start, event end.
  // getStatistics for the filtered data
  // set state for the stats data
  //
  // click event to fetch data?
  // TODO: have a form to select data query?
  if (loading) {
    return <Spinner />;
  }
  if (!statistics) {
    return <Text>No statistics available</Text>;
  }

  return (
    <Box display={{ md: 'flex' }} w='60%'>
      {statistics ? (
        <Box flexShrink={0} w='60%'>
          
          <Text>Total Events (sleep, naps and meals): {statistics.totalEvents}</Text>
          {filter.eventType === 'sleep' && (
            <>
            <Text>Total Sleep Time: {statistics.totalSleepTime.toFixed(1)} hours</Text>
            <Text>Total Sleep Events: {statistics.totalSleepEvents}</Text>
            <Text>Average Sleep Time: {statistics.averageSleepTime.toFixed(1)} hours</Text>
          </>
        )}
        {filter.eventType === 'nap' && (
          <><Text>Total Nap Time: {statistics.totalNapTime.toFixed(1)} hours</Text>
          <Text>Total Nap Events: {statistics.totalNapEvents}</Text>
          <Text>Average Nap Time: {statistics.averageNapTime.toFixed(1)} hours</Text>
          </>
        )}
        {filter.eventType === 'meal' && (
          <>
          <Text>Total Meal Events: {statistics.totalMealEvents}</Text>
          </>
        )}
        </Box>
      ) : (
        <Text>No statistics available</Text>)
      }
    </Box>
  );
};

export default StatisticsComponent;
