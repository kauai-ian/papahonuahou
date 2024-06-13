import {
  Box,
  Avatar,
  Heading,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import profilePic from "../assets/IMG_0160.jpg";

const ProfilePage = () => {
  const bg = useColorModeValue("gray.100", "gray.800");

  return (
    <Box
      bg={bg}
      boxShadow={"lg"}
      rounded={"lg"}
      p={8}
      maxW={"md"}
      mx={"auto"}
      mt={10}
      textAlign={"center"}
    >
      <Avatar size={"xl"} src={profilePic} mb={4} pos={"relative"} />
      <Heading fontSize={"2xl"}>Uncle Ian</Heading>
      <Text fontWeight={600} color={"gray.500"} mb={4}>
        @uncleian
      </Text>
      <Text
        textAlign={"center"}
        color={useColorModeValue("gray.700", "gray.400")}
        px={3}
      >
        Just a stay at home dad trying to build things that have a positive and lasting impact on the world.
      </Text>

      <Stack mt={8} direction={"row"} spacing={4}>
        <Button
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          _focus={{
            bg: "gray.200",
          }}
        >
          Edit
        </Button>
        
      </Stack>
    </Box>
  );
};

export default ProfilePage;
