import { Box, Button, Image, VStack, Link, Text } from "@chakra-ui/react";
import { PlayArrowRounded } from "@mui/icons-material";
import { Link as ReachTo } from "react-router-dom";

const Card = (props: {
  className?: string;
  img: string;
  title?: string;
  description?: string;
  type: string;
  id: string;
}) => {
  return (
    <VStack
      role="group"
      h="60"
      p="4"
      boxShadow="lg"
      bg="#1F1F1F"
      transition="ease-out 200ms"
      spacing="1.5"
      borderRadius="lg"
      _hover={{ bg: "#333333" }}
    >
      <Box boxSize="36" position="relative">
        <Image
          boxSize="36"
          boxShadow="sm"
          borderRadius="lg"
          src={props.img}
          alt="Cover"
        />

        <Button
          padding="1"
          size="lg"
          _groupHover={{ display: "block" }}
          _hover={{ bg: "spotify.g2", transform: "scale(1.1)" }}
          position="relative"
          bottom="35%"
          display="none"
          left="65%"
          backgroundColor="spotify.g1"
          borderRadius="full"
        >
          <Link color="E0DFD5" as={ReachTo} to={`/${props.type}/${props.id}`}>
            <PlayArrowRounded
              style={{
                color: "E0DFD5",
                width: "40px",
                height: "40px",
                padding: "2px",
              }}
            />
          </Link>
        </Button>
      </Box>
      <Text noOfLines={1} w="36">
        {props.title}
      </Text>
      <Text noOfLines={1} w="36" fontSize="smaller" color="spotify.text-gray">
        {props.description} &middot; {props.type.toUpperCase()}
      </Text>
    </VStack>
  );
};

export default Card;
