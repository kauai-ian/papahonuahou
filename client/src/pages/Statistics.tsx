import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import StatisticsForm from "../components/StatsForm";
import { SummaryStatisticsComponent } from "../components/AllStatistics";

const StatisticsPage: React.FC = () => {
  const filter = {
    eventTypes: ["sleep", "nap", "meal"],
    eventStart: new Date(),
    eventEnd: new Date(),
  };

  return (
    <Box p={4}>
      <Heading as='h1' mb={6}>Statistics</Heading>
      <SummaryStatisticsComponent filter={filter} />

      <StatisticsForm />
    </Box>
  );
};

export default StatisticsPage;
