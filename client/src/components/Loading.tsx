import { Container, Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Container h="100%">
      <Center mt="100px">
        <Spinner />
      </Center>
    </Container>
  );
};

export default Loading;