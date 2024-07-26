import { Button, useColorMode } from "@chakra-ui/react";

const ColorModeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} m={4} fontSize="small">
      {colorMode === "light" ? "dark" : "light"} mode 
    </Button>
  );
};

export default ColorModeToggleButton;
