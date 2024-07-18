import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import StatisticsForm from "../components/StatsForm";
import { SummaryStatisticsComponent } from "../components/SummarizeStatistics";
import SleepTrendChart from "../components/Charts";
import { StatisticsProvider } from "../context/statsContext";

const StatisticsPage: React.FC = () => {
  return (
    <StatisticsProvider>
      <Box p={4} display="flex" flexDir="column" alignItems="center">
        <Heading as="h1" mb={6} letterSpacing="0.1em">
          Statistics
        </Heading>
        <Text fontSize="lg" mb={4}>
          See your baby's activity over the past:
        </Text>
        <SummaryStatisticsComponent />
        <Text mt={8} fontSize="xl" letterSpacing="0.1em">
          Sleep Duration Trend
        </Text><Box w="100%" mt={8} justifyContent="center" display="flex" boxSize="50%" boxShadow="lg">
          <SleepTrendChart />
        </Box>
        <Box
          borderRadius="md"
          p={4}
          mt={6}
          boxSize="50%"
          boxShadow="lg"
          bgColor=""
          alignContent="center"
        >
          <Text fontSize="xl" mb={4} textAlign="center" letterSpacing="0.1em">
            Lookup Events
          </Text>
          <Text fontSize="lg" mb={4} textAlign="center">
            Find a specific range for an event type
          </Text>
          <StatisticsForm />
        </Box>
        
      </Box>
    </StatisticsProvider>
  );
};

export default StatisticsPage;
