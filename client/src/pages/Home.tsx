// HomePage.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GiBabyBottle } from "react-icons/gi";
import { GiNightSleep } from "react-icons/gi";
import { ImSleepy } from "react-icons/im";
import logo from "../assets/Logo-papahonuahou.png";
import NewEventModal from "../components/NewEventModal";

const HomePage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventType, setEventType] = useState("");

  const handleOpenForm = (type: string) => {
    setEventType(type); // Open  modal and pass  event type to  form
    onOpen();
  };

  return (
    <Center flexDir="column" p={4}>
      <Image boxSize="200px" src={logo} alt="Logo" mx="auto" mb={4} />
      <Box boxSize="50%" pb={6}>
        <Text as="h1" pb={2}>Welcome back <b>Ian</b>, to Papa Honua Hou</Text>
        <Text fontSize="lg" fontStyle="italic" pb={2}>
          Your guide through the journey of fatherhood.
        </Text>

        <Text >
          Embark on a new adventure with confidence. Papa Honua Hou is your
          personal assistant, designed to help you navigate the early stages of
          fatherhood with ease. From managing sleep schedules to supporting your
          partner, we’re here to ensure you have the tools you need to thrive as
          a new dad.
        </Text>
      </Box>
      <Stack direction="row" spacing={10} justify="center">
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          boxShadow="md"
          textAlign="center"
          onClick={() => handleOpenForm("sleep")}
          cursor="pointer"
        >
          <Center mb={4}>
            <GiNightSleep size="40px" />
          </Center>
          <Heading size="md" mb={4}>
            Sleep
          </Heading>
          <Button colorScheme="teal" mt={4}>
            Create Sleep Event
          </Button>
        </Box>

        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          boxShadow="md"
          textAlign="center"
          onClick={() => handleOpenForm("nap")}
          cursor="pointer"
        >
          <Center mb={4}>
            <ImSleepy size="40px" />
          </Center>
          <Heading size="md" mb={4}>
            Nap
          </Heading>
          <Button colorScheme="teal" mt={4}>
            Create Nap Event
          </Button>
        </Box>

        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          boxShadow="md"
          textAlign="center"
          onClick={() => handleOpenForm("meal")}
          cursor="pointer"
        >
          <Center mb={4}>
            <GiBabyBottle size="40px" />
          </Center>
          <Heading size="md" mb={4}>
            Meal
          </Heading>
          <Button colorScheme="teal" mt={4}>
            Create Meal Event
          </Button>
        </Box>
      </Stack>

      <NewEventModal isOpen={isOpen} onClose={onClose} eventType={eventType} />
    </Center>
  );
};

export default HomePage;
