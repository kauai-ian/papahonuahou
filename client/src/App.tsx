import "./App.css";
import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Routes, Route, NavLink as RouterNavLink } from "react-router-dom";
import Days from "./pages/Days";
import useEvents from "./hooks/useEvents";
import Loading from "./components/Loading";
import StatisticsPage from "./pages/Statistics";
import { NavLink } from "./components/NavLink";
import CalendarPage from "./pages/Calendar";
import logo from "./assets/Logo-papahonuahou.png";
import profilePic from "./assets/IMG_0160.jpg";
import ProfilePage from "./pages/Profile";
import LogoutPage from "./pages/Logout";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ColorModeToggleButton from "./hooks/useColorMode";
import { useColorModeValue } from "@chakra-ui/react";

const App: React.FC = () => {
  const { isLoading } = useEvents();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Links = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Calendar", to: "/calendar" },
    { name: "History", to: "/days" },
    { name: "Statistics", to: "/statistics" },
  ];

  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box bg={bgColor} px={10}>
            <Flex h={24} alignItems={"center"} justifyContent={"space-between"}>
              <IconButton
                size={"md"}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={"Open Menu"}
                display={{ md: "none" }}
                onClick={isOpen ? onClose : onOpen}
              />
              <HStack spacing={8} alignItems={"center"}>
                <Image boxSize={"100px"} src={logo} borderRadius={"full"} />
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  {Links.map((link) => (
                    <NavLink key={link.name} to={link.to}>
                      {link.name}
                    </NavLink>
                  ))}
                </HStack>
              </HStack>
              <Flex alignItems={"center"}>
                <ColorModeToggleButton />
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Image
                      boxSize={"50px"}
                      src={profilePic}
                      borderRadius={"full"}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={RouterNavLink} to="/profile">
                      Profile
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem as={RouterNavLink} to="/logout">
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>

            {isOpen ? (
              <Box pb={4} display={{ md: "none" }}>
                <Stack as={"nav"} spacing={4}>
                  {Links.map((link) => (
                    <NavLink key={link.name} to={link.to}>
                      {link.name}
                    </NavLink>
                  ))}
                </Stack>
              </Box>
            ) : null}
          </Box>

          <Box p={4}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/days" element={<Days />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Box>
          <footer>
            <Box className="footerContainer">
              <a
                href="https://github.com/kauai-ian"
                target="_blank"
                rel="noReferrer"
              >
                <img
                  src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png"
                  alt="github"
                  width="60px"
                />
                <p>Made in Hawaii by Ian Tierney</p>
              </a>
            </Box>
          </footer>
        </>
      )}
    </>
  );
};

export default App;
