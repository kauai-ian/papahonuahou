import React, { useEffect, useState } from "react";
import { Box, Text, Spinner, Button, Stack } from "@chakra-ui/react";
import { getStatistics } from "../api/events";
import dayjs from "dayjs";

type StatisticSummary = {
  totalEvents: number;
  totalSleepTime: number;
  totalSleepEvents: number;
  totalNapTime: number;
  totalNapEvents: number;
  totalMealEvents: number;
  averageSleepTime: number;
  averageNapTime: number;
};

type StatisticSummaryProps = {
  filter: {
    eventTypes: string[];
    eventStart: Date;
    eventEnd: Date;
  };
};

export const SummaryStatisticsComponent: React.FC<StatisticSummaryProps> = ({
  filter,
}) => {
  const [statistics, setStatistics] = useState<StatisticSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<string>("7days");

  useEffect(() => {
    const calculateDateRange = () => {
      let eventStart: Date;
      const eventEnd: Date = new Date();

      if (timeRange === "7days") {
        eventStart = dayjs().subtract(7, "day").toDate();
      } else if (timeRange === "30days") {
        eventStart = dayjs().subtract(30, "day").toDate();
      } else {
        eventStart = new Date("1970-01-01"); // all time
      }
      return { eventStart, eventEnd };
    };

    const fetchStats = async () => {
      try {
        const { eventStart, eventEnd } = calculateDateRange();
        const updatedFilter = { ...filter, eventStart, eventEnd };
        console.log("Fetching statistics with filter:", updatedFilter);
        const response = await getStatistics(updatedFilter);
        console.log("Statistics data:", response.data);
        setStatistics(response.data);
      } catch (error) {
        console.error("failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [filter, timeRange]);

  if (loading) {
    return <Spinner />;
  }
  if (!statistics) {
    return <Text>No statistics available</Text>;
  }

  return (
    <Stack direction="row" spacing={10}>
      <Box display="flex" justifyContent="space-around" mb={4}>
        <Button onClick={() => setTimeRange("7days")}>Last 7 Days</Button>
        <Button onClick={() => setTimeRange("30days")}>Last 30 Days</Button>
        <Button onClick={() => setTimeRange("all")}>All Time</Button>
      </Box>
      <Box display={{ md: "flex" }} w="100%">
        {statistics ? (
          <Box flexShrink={0} w="100%">
            <Text>
              Total Events (sleep, naps and meals): {statistics.totalEvents}
            </Text>
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

            <>
              <Text>
                Total Nap Time: {statistics.totalNapTime.toFixed(1)} hours
              </Text>
              <Text>Total Nap Events: {statistics.totalNapEvents}</Text>
              <Text>
                Average Nap Time: {statistics.averageNapTime.toFixed(1)} hours
              </Text>
            </>

            <>
              <Text>Total Meal Events: {statistics.totalMealEvents}</Text>
            </>
          </Box>
        ) : (
          <Text>No statistics available</Text>
        )}
      </Box>
    </Stack>
  );
};
