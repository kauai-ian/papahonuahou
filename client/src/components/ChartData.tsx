import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  Button,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { getEvent, getStatistics } from "../api/events";
import dayjs from "dayjs";


type ChartDataProps = {
  filter: {
    eventTypes: string[];
    eventStart: Date;
    eventEnd: Date;
  };
};

export const ChartData: React.FC<ChartDataProps> = ({
  filter, statistics
}) => {
  const [loading, setLoading] = useState<boolean>(true);


  if (loading) {
    return <Spinner />;
  }
  if (!chartData) {
    return <Text>No chart data available</Text>;
  }

  return (
    
  );
};
