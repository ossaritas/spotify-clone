import { Link as ReachTo } from "react-router-dom";

import logo from "../../assests/spLogo.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Favourites from "./Favourites";
import { Image, VStack, Link, Text, GridItem, Box } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <GridItem
      gridArea="1/1/3/2"
      overflow="hidden"
      bg="spotify.sidebar"
      p="5"
      minW="60"
      w="52"
      transition="ease-out 200ms"
    >
      <VStack alignItems="flex-start">
        <Box m="1.5" p="0">
          <Link _focus={{ outline: "none" }} as={ReachTo} to="/">
            <Image w="32" h="10" src={logo} alt="logo" />
          </Link>
        </Box>
        <Link
          _activeLink={{ color: "white" }}
          _focus={{ outline: "none", color: "white" }}
          _hover={{ color: "gray.200" }}
          display="flex"
          p="2"
          color="spotify.text-gray"
          as={ReachTo}
          to="/"
        >
          <HomeIcon />

          <Text ml="1.5" p="2px" h="1.5">
            Home
          </Text>
        </Link>
        <Link
          _activeLink={{ color: "white" }}
          _focus={{ outline: "none", color: "white" }}
          _hover={{ color: "gray.200" }}
          display="flex"
          p="2"
          color="spotify.text-gray"
          as={ReachTo}
          to="/search"
        >
          <SearchIcon />

          <Text ml="1.5" p="2px" h="1.5">
            Search
          </Text>
        </Link>
        <Link
          _activeLink={{ color: "white" }}
          _focus={{ outline: "none", color: "white" }}
          _hover={{ color: "gray.200" }}
          display="flex"
          p="2"
          color="spotify.text-gray"
          as={ReachTo}
          to="/liked"
        >
          <LibraryMusicIcon />

          <Text ml="1.5" p="2px" h="1.5">
            Liked Songs
          </Text>
        </Link>

        <Divider />
        <Favourites />
      </VStack>
    </GridItem>
  );
};

export default Sidebar;
