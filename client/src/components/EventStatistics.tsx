// display event statistics
import React, { useEffect, useState } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { getStatistics } from "../api/events";

type Statistic = {
  totalEvents: number;
  totalSleepTime: number;
  totalSleepEvents: number;
  totalNapTime: number;
  totalNapEvents: number;
  totalMealEvents: number;
  averageSleepTime: number;
  averageNapTime: number;
  totalDiaperChanges: number;
};

type StatisticsComponentProps = {
  filter: {
    eventTypes: string[];
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

  if (loading) {
    return <Spinner />;
  }
  if (!statistics) {
    return <Text>No statistics available</Text>;
  }

  return (
    <Box>
      {statistics ? (
        <Box>
          <Text >
            Total Events (sleep, naps, meals and diapers): {statistics.totalEvents}
          </Text>
          {filter.eventTypes.includes("sleep") && (
            <>
              <Text>
                Total Sleep Time: {statistics.totalSleepTime.toFixed(1)} hours
              </Text>
              <Text>Total Sleep Events: {statistics.totalSleepEvents}</Text>
              <Text>
                Average Sleep Time: {statistics.averageSleepTime.toFixed(1)}{" "}
                hours
              </Text>
            </>
          )}
          {filter.eventTypes.includes("nap") && (
            <>
              <Text>
                Total Nap Time: {statistics.totalNapTime.toFixed(1)} hours
              </Text>
              <Text>Total Nap Events: {statistics.totalNapEvents}</Text>
              <Text>
                Average Nap Time: {statistics.averageNapTime.toFixed(1)} hours
              </Text>
            </>
          )}
          {filter.eventTypes.includes("meal") && (
            <>
              <Text>Total Meal Events: {statistics.totalMealEvents}</Text>
            </>
          )}
          {filter.eventTypes.includes("diaper") && (
            <>
              <Text>Total Diaper Events: {statistics.totalDiaperChanges}</Text>
            </>
          )}
        </Box>
      ) : (
        <Text>No statistics available</Text>
      )}
    </Box>
  );
};

export default StatisticsComponent;
