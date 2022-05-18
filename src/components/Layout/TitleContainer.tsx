// PLAY AND FAVOURITE BUTTONS - JUST FOR STYLING
// import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
// import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { /*Button*/ HStack, Image, Text, VStack } from "@chakra-ui/react";

const TitleContainer = (props: {
  img: string;
  type: string;
  name?: string;
  description?: string;
  label?: string;
  releaseDate?: string;
  totalTracks?: number;
}) => {
  return (
    <VStack spacing="14" pb="10" pl="10" pt="24" alignItems="flex-start">
      <HStack spacing="8">
        <Image boxSize="64" objectFit="contain" src={props.img} alt="rep" />

        <VStack alignItems="flex-start" spacing="4" w="full">
          <Text textTransform="uppercase" fontSize="20px">
            {props.type}
          </Text>
          {props.name ? (
            <Text
              noOfLines={1}
              letterSpacing="tighter"
              fontSize="7xl"
              lineHeight="shorter"
            >
              {props.name}
            </Text>
          ) : null}
          {props.description ? (
            <Text
              textColor="spotify.text-gray"
              className="text-[#b3b3b3] pt-[5px] "
            >
              {props.description}
            </Text>
          ) : null}
          {props.type === "Album" ? (
            <VStack alignItems="flex-start">
              <HStack>
                <Text color="spotify.text-gray">Label &#58;</Text>{" "}
                <Text>{props.label}</Text>
              </HStack>
              <HStack>
                <Text color="spotify.text-gray">Release Date &#58;</Text>{" "}
                <Text>{props.releaseDate}</Text>
              </HStack>
              <HStack>
                <Text color="spotify.text-gray">Total Tracks &#58;</Text>{" "}
                <Text> {props.totalTracks}</Text>
              </HStack>
            </VStack>
          ) : null}
        </VStack>
      </HStack>
      {/* PLAY AND FAVOURITE BUTTONS - JUST FOR STYLING */}
      {/* <HStack ml="2.5" spacing="6">
        <Button
          bgColor="white"
          _hover={{ transform: "scale(1.1)" }}
          boxSize="10"
        >
          <PlayCircleFilledIcon
            style={{ color: "#1db954", width: "62.5px", height: "62.5px" }}
          />
        </Button>
        <Button _hover={{ transform: "scale(1.1)" }} boxSize="10">
          <FavoriteBorderRoundedIcon
            style={{ width: "45px", height: "45px" }}
          />
        </Button>
      </HStack> */}
    </VStack>
  );
};

export default TitleContainer;
