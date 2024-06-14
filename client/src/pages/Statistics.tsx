import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import StatisticsForm from "../components/StatsForm";
import { SummaryStatisticsComponent } from "../components/SummarizeStatistics";
// import { MyChart, SleepProps } from "../components/Charts";

const StatisticsPage: React.FC = () => {
  // const [sleepData, setSleepData] = React.useState<SleepProps[]>([]);

  const filter = {
    eventTypes: ["sleep", "nap", "meal", "diaper"],
    eventStart: new Date(),
    eventEnd: new Date(),
  };

  // temp data
  // React.useEffect(() => {
  //   const data: SleepProps[] = [
  //     { date: new Date("2024-02-03T00:00:00.000Z"), sleepDuration: 8.5 },
  //     { date: new Date("2024-02-04T00:00:00.000Z"), sleepDuration: 8 },
  //     { date: new Date("2024-02-05T00:00:00.000Z"), sleepDuration: 7.5 },
  //   ];

  //   setSleepData(data);
  // }, []);

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
      {/* <Box w="100%" mt={8} alignItems="center" display="flex">
         <MyChart data={sleepData} /> 
      </Box> */}
    </Box>
  );
};

export default StatisticsPage;
