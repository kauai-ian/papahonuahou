import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Image,
  VStack,
  List,
  ListItem,
} from "@chakra-ui/react";

import logo from "../assets/Logo-papahonuahou.png";

const AboutPage: React.FC = () => {
  return (
    <Center bg="offWhite" minH="100vh" p={4}>
      <VStack spacing={8} maxW="xl" mx="auto">
        <Image boxSize="200px" src={logo} alt="Logo" mx="auto" mb={4} />
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <Heading as="h1" size="xl" textAlign="center">
            Our Mission
          </Heading>
          <Text as="h2" fontSize="lg" my={4} textAlign="center">
            Empowering New Dads to Embrace Their New World
          </Text>

          <Text fontStyle="italic" mb={4}>
            Fatherhood is a voyage into uncharted territory, like a canoe ride
            on the ocean. At Honua Hou, we understand the challenges you
            face—from adjusting to new routines. Our app is created in Hawaii to
            provide a simple and warm support system, helping you balance the
            demands of parenting with the joy it brings.
          </Text>

          <List spacing={3} textAlign="left">
            <ListItem>
              <b>Robust Scheduling System:</b> Keep track of feeding, diaper
              changes, and sleep patterns with our adaptive scheduling tool.
            </ListItem>
            <ListItem>
              <b>Communication Tracker:</b> Stay connected and coordinate care
              with your partner, ensuring you're both informed and involved.
            </ListItem>
            <ListItem>
              <b>Insightful Analytics:</b> View averages and trends for sleep,
              feeding, and wake windows, helping you anticipate your baby's
              needs.
            </ListItem>
            <ListItem>
              <b>Interactive Dashboard:</b> A rolling 7-day view keeps you
              up-to-date, while our event and note system allows for easy
              record-keeping.
            </ListItem>
          </List>
          <Text mt={4}>
            Join us at <b>Honua Hou</b>, where we bring calm and ease to
            dad's world, one day at a time.
          </Text>
        </Box>
      </VStack>
    </Center>
  );
};

export default AboutPage;
