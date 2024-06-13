// manage and display days
import React from "react";
import DayList from "../components/DayListv2";
import { Box, Center } from "@chakra-ui/react";


const Days: React.FC = () => {
  return (
    <div>
      <h1>History</h1>
      <Center>
        <Box
        mb="2"
        w={["90%", "70%", "50%", "30%"]}
        maxHeight="calc(100vh - 300px)"
        overflowY="auto"
      >
        <DayList />
      </Box>
      </Center>
    </div>
  );
};

export default Days;
