import React from "react";
import {
  Box,
  Center,
  Heading,
  Menu,
  MenuItem,
  Text,
  Image,
} from "@chakra-ui/react";

import logo from "../assets/Logo-papahonuahou.png";

const AboutPage: React.FC = () => {
  return (
    <Center>
      <Image boxSize="200px" src={logo} alt="Logo" mx="auto" mb={4} />
      <Box>
        <Heading>Our Mission</Heading>
        <Text as="h2">Empowering New Dads to Embrace Their New World</Text>

        <Text fontStyle="oblique">
          Fatherhood is a voyage into uncharted territory, like a canoe ride on
          the ocean. At Papa Honua Hou, we understand the challenges you
          face—from adjusting to new routines. Our app is created in Hawaii to
          provide a simple and warm support system, helping you balance the
          demands of parenting with the joy it brings.
        </Text>

        <Menu>
          <MenuItem>
            Robust Scheduling System: Keep track of feeding, diaper changes, and
            sleep patterns with our adaptive scheduling tool.
          </MenuItem>
          <MenuItem>
            Communication Tracker: Stay connected and coordinate care with your
            partner, ensuring you're both informed and involved.
          </MenuItem>
          <MenuItem>
            Insightful Analytics: View averages and trends for sleep, feeding,
            and wake windows, helping you anticipate your baby's needs.
          </MenuItem>
          <MenuItem>
            Interactive Dashboard: A rolling 7-day view keeps you up-to-date,
            while our event and note system allows for easy record-keeping.
          </MenuItem>
        </Menu>
        <Text>
          Join us at Papa Honua Hou, where we make every dad's world a little
          easier, one day at a time.
        </Text>
      </Box>
    </Center>
  );
};

export default AboutPage;
