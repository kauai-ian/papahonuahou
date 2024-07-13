import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import StatisticsForm from "../components/StatsForm";
import { SummaryStatisticsComponent } from "../components/SummarizeStatistics";
import SleepTrendChart, { SleepDataPoint } from "../components/Charts";
// import { MyChart, SleepProps } from "../components/Charts";

const StatisticsPage: React.FC = () => {
  const [sleepData, setSleepData] = React.useState<SleepDataPoint[]>([]);

  const filter = {
    eventTypes: ["sleep", "nap", "meal", "diaper"],
    eventStart: new Date(),
    eventEnd: new Date(),
  };

  // temp data
  React.useEffect(() => {
    const data: SleepDataPoint[] = [
      { date: new Date("2024-02-03T00:00:00.000Z"), sleepDuration: 8.5 },
      { date: new Date("2024-02-04T00:00:00.000Z"), sleepDuration: 8 },
      { date: new Date("2024-02-05T00:00:00.000Z"), sleepDuration: 7.5 },
      { date: new Date("2024-02-06T00:00:00.000Z"), sleepDuration: 8.2 },
      { date: new Date("2024-02-07T00:00:00.000Z"), sleepDuration: 7.8 },
      { date: new Date("2024-02-08T00:00:00.000Z"), sleepDuration: 6.9 },
      { date: new Date("2024-02-09T00:00:00.000Z"), sleepDuration: 7.7 },
      { date: new Date("2024-02-10T00:00:00.000Z"), sleepDuration: 7.6 },
      { date: new Date("2024-02-11T00:00:00.000Z"), sleepDuration: 8.0 },
      { date: new Date("2024-02-12T00:00:00.000Z"), sleepDuration: 6.5 },
      { date: new Date("2024-02-13T00:00:00.000Z"), sleepDuration: 7.1 },
      { date: new Date("2024-02-14T00:00:00.000Z"), sleepDuration: 8.4 },
      { date: new Date("2024-02-15T00:00:00.000Z"), sleepDuration: 7.0 },
      { date: new Date("2024-02-16T00:00:00.000Z"), sleepDuration: 7.3 },
      { date: new Date("2024-02-17T00:00:00.000Z"), sleepDuration: 6.8 },
      { date: new Date("2024-02-18T00:00:00.000Z"), sleepDuration: 7.9 },
      { date: new Date("2024-02-19T00:00:00.000Z"), sleepDuration: 8.3 },
      { date: new Date("2024-02-20T00:00:00.000Z"), sleepDuration: 7.2 },
      { date: new Date("2024-02-21T00:00:00.000Z"), sleepDuration: 8.1 },
      { date: new Date("2024-02-22T00:00:00.000Z"), sleepDuration: 7.4 },
      { date: new Date("2024-02-23T00:00:00.000Z"), sleepDuration: 6.6 },
      { date: new Date("2024-02-24T00:00:00.000Z"), sleepDuration: 7.5 },
      { date: new Date("2024-02-25T00:00:00.000Z"), sleepDuration: 8.0 },
      { date: new Date("2024-02-26T00:00:00.000Z"), sleepDuration: 8.2 },
      { date: new Date("2024-02-27T00:00:00.000Z"), sleepDuration: 7.8 },
      { date: new Date("2024-02-28T00:00:00.000Z"), sleepDuration: 7.9 },
      { date: new Date("2024-02-29T00:00:00.000Z"), sleepDuration: 8.1 },
      { date: new Date("2024-03-01T00:00:00.000Z"), sleepDuration: 7.7 },
      { date: new Date("2024-03-02T00:00:00.000Z"), sleepDuration: 6.5 },
      { date: new Date("2024-03-03T00:00:00.000Z"), sleepDuration: 7.2 },
    ];

    setSleepData(data);
  }, []);

  return (
    <Box p={4} display="flex" flexDir="column" alignItems="center">
      <Heading as="h1" mb={6} letterSpacing="0.1em">
        Statistics
      </Heading>
      <Text fontSize="lg" mb={4}>
        See your baby's activity over the past:
      </Text>
      <SummaryStatisticsComponent filter={filter} />

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
      <Text mt={8} fontSize="xl" letterSpacing="0.1em">Sleep Duration Trend</Text>
      <Box  w="100%" mt={4} justifyContent="center" display="flex">
        <SleepTrendChart data={sleepData} />
      </Box>
    </Box>
  );
};

export default StatisticsPage;
