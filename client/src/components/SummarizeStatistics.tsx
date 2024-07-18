import React from "react";
import {
  Box,
  Text,
  Spinner,
  Button,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";

import StatsCard from "./StatsCard";
import { FaRunning } from "react-icons/fa";
import { GiBabyBottle, GiNightSleep } from "react-icons/gi";
import { ImSleepy } from "react-icons/im";
import { MdBabyChangingStation } from "react-icons/md";
import { useStatistics } from "../context/statsContext";

export const SummaryStatisticsComponent: React.FC = () => {
  const { statistics, timeRange, setTimeRange, loading } = useStatistics();

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
