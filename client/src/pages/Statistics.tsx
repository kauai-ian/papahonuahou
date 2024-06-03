// todo shows all statistics
import React from 'react';
import { Box } from '@chakra-ui/react';
import StatisticsForm from '../components/StatsForm';

const StatisticsPage: React.FC = () => {
  return (
    <Box p={4}>
      <h1>Statistics</h1>
      <StatisticsForm />
    </Box>
  );
};

export default StatisticsPage;