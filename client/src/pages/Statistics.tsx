// todo shows all statistics
import React from 'react';
import { Box } from '@chakra-ui/react';
import StatisticsForm from '../components/StatsForm';
// import { ToggleStatisticsComponent } from '../components/ToggleStatistics';


// TODO Render the statistics toggle buttons

const StatisticsPage: React.FC = () => {

  return (
    <Box p={4}>
      <h1>Statistics</h1>
      {/* <ToggleStatisticsComponent filter={{
        eventType: '',
        eventStart: undefined,
        eventEnd: undefined
      }}  /> */}

      <StatisticsForm />
    </Box>
  );
};

export default StatisticsPage;