import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GiBabyBottle } from "react-icons/gi";
import { GiNightSleep } from "react-icons/gi";
import { ImSleepy } from "react-icons/im";
import logo from "../assets/Logo-papahonuahou.png";
import NewEventModal from "../components/NewEventModal";
import { MdBabyChangingStation } from "react-icons/md";

const HomePage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventType, setEventType] = useState("");

  const handleOpenForm = (type: string) => {
    setEventType(type); // Open  modal and pass  event type to  form
    onOpen();
  };

  return (
    <Center flexDir="column" p={4} mb={8}>
      <Image boxSize="200px" src={logo} alt="Logo" mx="auto" mb={4} />
      <Box boxSize={{base: '100%', md:'80%', lg: '50%'}}  mb={6}>
        <Text as="h1" pb={2}>
          Welcome back <b>Ian</b>, to Papa Honua Hou
        </Text>
        <Text fontSize="lg" fontStyle="italic" pb={2}>
          Your guide through the journey of fatherhood.
        </Text>

        <Text>
          Embark on a new adventure with confidence. Papa Honua Hou is your
          personal assistant, designed to help you navigate the early stages of
          fatherhood with ease. From managing sleep schedules to supporting your
          partner, we’re here to ensure you're livin' easy as a new dad.
        </Text>
      </Box>
      <SimpleGrid  columns={{ base: 1, md: 2, lg: 2 }}
        gap={6}
        justifyContent='center' alignItems='center'
        width={{ base: '90%', md: '70%', lg: '50%' }} >
        <Box
          maxW="300px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          boxShadow="md"
          textAlign="center"
          onClick={() => handleOpenForm("sleep")}
          cursor="pointer"
        >
          <Center mb={4} >
            <GiNightSleep size="40px" color="teal" />
          </Center>
          <Heading size="md" mb={4}>
            Sleep
          </Heading>
          <Button colorScheme="teal" mt='auto' width="full" whiteSpace='normal'>
            Create Sleep Event
          </Button>
        </Box>

        <Box
          maxW="300px"
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
            <ImSleepy size="40px" color="teal" />
          </Center>
          <Heading size="md" mb={4}>
            Nap
          </Heading>
          <Button colorScheme="teal" mt='auto' width="full" whiteSpace='normal'>
            Create Nap Event
          </Button>
        </Box>

        <Box
          maxW="300px"
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
            <GiBabyBottle size="40px" color="teal" />
          </Center>
          <Heading size="md" mb={4}>
            Meal
          </Heading>
          <Button colorScheme="teal" mt='auto' width="full" whiteSpace='normal'>
            Create Meal Event
          </Button>
        </Box>
        <Box
          maxW="300px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          boxShadow="md"
          textAlign="center"
          onClick={() => handleOpenForm("diaper")}
          cursor="pointer"
        >
          <Center mb={4}>
            <MdBabyChangingStation size="40px" color="teal" />
          </Center>
          <Heading size="md" mb={4}>
            Diaper Change
          </Heading>
          <Button colorScheme="teal" mt='auto' width="full" whiteSpace='normal'>
            Create Change Event
          </Button>
        </Box>
      </SimpleGrid>

      <NewEventModal isOpen={isOpen} onClose={onClose} eventType={eventType} />
    </Center>
  );
};

export default HomePage;
