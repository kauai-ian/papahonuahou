import { ReactNode } from "react";
import { Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import { NavLink as RouterNavLink } from "react-router-dom";

export const NavLink = ({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) => (
  <ChakraLink
    as={RouterNavLink}
    to={to}
    px={2}
    py={1}
    rounded={"md"}
    color={useColorModeValue("gray.800", "whiteAlpha.900")}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    _activeLink={{
      fontWeight: "bold",
      color: useColorModeValue("teal.600", "teal.300"),
    }}
  >
    {children}
  </ChakraLink>
);
