import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import StatisticsForm from "../components/StatsForm";
import { SummaryStatisticsComponent } from "../components/SummarizeStatistics";

const StatisticsPage: React.FC = () => {
  const filter = {
    eventTypes: ["sleep", "nap", "meal"],
    eventStart: new Date(),
    eventEnd: new Date(),
  };

  return (
    <Box p={4} display="flex" flexDir="column" alignItems="center">
      <Heading as="h1" mb={6}  letterSpacing='0.1em'>
        Statistics
      </Heading>
      <Text fontSize="lg" mb={4}>
        Try changing the dates using the buttons
      </Text>
      <SummaryStatisticsComponent filter={filter} />

      <Box
        borderRadius="md"
        p={4}
        boxSize="lg"
        boxShadow="lg"
        bgColor=""
        alignContent="center"
      >
        <Text fontSize="xl" mb={4} textAlign="center" letterSpacing='0.1em'>
          Lookup Events
        </Text>
        <Text fontSize="lg" mb={4} textAlign="center">
          Find a specific range for an event type
        </Text>
        <StatisticsForm />
      </Box>
    </Box>
  );
};

export default StatisticsPage;
