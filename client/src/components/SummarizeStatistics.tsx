import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  Button,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { getStatistics } from "../api/events";
import dayjs from "dayjs";
import StatsCard from "./StatsCard";
import { FaRunning } from "react-icons/fa";
import { GiBabyBottle, GiNightSleep } from "react-icons/gi";
import { ImSleepy } from "react-icons/im";
import { MdBabyChangingStation } from "react-icons/md";

type StatisticSummary = {
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
        const updatedFilter = {
          ...filter,
          eventTypes: ["sleep", "nap", "meal", "diaper"],
          eventStart,
          eventEnd,
        };
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
    <Stack spacing={4} justifyContent="center" alignItems="center">
      <Box display="flex" justifyContent="center" gap={6} mb={4}>
        <Button
          onClick={() => setTimeRange("7days")}
          colorScheme={timeRange === "7days" ? "teal" : "gray"}
          fontSize="sm"
          fontWeight="none"
        >
          Last 7 Days
        </Button>
        <Button
          onClick={() => setTimeRange("30days")}
          colorScheme={timeRange === "30days" ? "teal" : "gray"}
          fontSize="sm"
          fontWeight="none"
        >
          Last 30 Days
        </Button>
        <Button
          onClick={() => setTimeRange("all")}
          colorScheme={timeRange === "all" ? "teal" : "gray"}
          fontSize="sm"
          fontWeight="none"
        >
          All Time
        </Button>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} width="60%">
        <StatsCard
          title="Total Events (sleep, naps, meals and diaper changes):"
          value={statistics.totalEvents}
          icon={FaRunning}
          children={""}
        />
        <StatsCard
          title="Sleep average:"
          value={Number(statistics.averageSleepTime.toFixed(1))}
          icon={GiNightSleep}
          children={"hours"}
        />
        <StatsCard
          title="Nap average:"
          value={Number(statistics.averageNapTime.toFixed(1))}
          icon={ImSleepy}
          children={"hours"}
        />
        <StatsCard
          title="Meal events total:"
          value={statistics.totalMealEvents}
          icon={GiBabyBottle}
          children={""}
        />
        <StatsCard
          title="Diaper changes total:"
          value={statistics.totalDiaperChanges}
          icon={MdBabyChangingStation}
          children={""}
        />
      </SimpleGrid>
    </Stack>
  );
};
