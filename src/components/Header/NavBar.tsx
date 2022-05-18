import { Container, Link, HStack, Text } from "@chakra-ui/react";
import { Link as ReachTo } from "react-router-dom";

const NavBar = () => {
  return (
    <Container
      zIndex="sticky"
      position="fixed"
      top="0"
      p="0"
      maxW="full"
      bgGradient={"linear(to-t, #000000,  #3d3d3d)"}
    >
      <HStack pl="7" h="16">
        <Text color="spotify.g2">FEATURED</Text>
        <Link
          borderRadius="6"
          _activeLink={{ color: "white" }}
          _focus={{ outline: "none", color: "white", bgColor: "gray.700" }}
          _hover={{ color: "gray.200" }}
          display="flex"
          p="2"
          color="spotify.text-gray"
          as={ReachTo}
          to="/playlist"
        >
          {" "}
          Playlists
        </Link>
        <Link
          borderRadius="6"
          _activeLink={{ color: "white" }}
          _focus={{ outline: "none", color: "white", bg: "gray.700" }}
          _hover={{ color: "gray.200" }}
          display="flex"
          p="2"
          color="spotify.text-gray"
          as={ReachTo}
          to="/albums"
        >
          Albums
        </Link>{" "}
      </HStack>
    </Container>
  );
};

export default NavBar;
