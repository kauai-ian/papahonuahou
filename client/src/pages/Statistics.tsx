import React from "react";
import { Box } from "@chakra-ui/react";
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
      <h1>Statistics</h1>
      <SummaryStatisticsComponent filter={filter} />

      <StatisticsForm />
    </Box>
  );
};

export default StatisticsPage;
