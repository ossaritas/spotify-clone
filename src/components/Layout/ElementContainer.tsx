import { Container, Text, Grid, Divider, HStack } from "@chakra-ui/react";

const ElementContainer = (props: {
  card: boolean;
  text?: string;
  children?: any;
  bgColor?: string;
}) => {
  return (
    <Container p="0" maxW="full">
      {props.card ? (
        <Container p="4" mt="12" maxW="full">
          {props.text ? (
            <Text py="5" fontSize="3xl" textAlign="center">
              {props.text}
            </Text>
          ) : null}
          <Grid
            pt={props.text ? "0" : "8"}
            templateColumns={"repeat(auto-fill, minmax(170px, 1fr))"}
            gap="4"
          >
            {props.children}
          </Grid>
        </Container>
      ) : null}

      {!props.card ? (
        <Container maxW="full" p="4">
          <HStack justifyContent="center" w="full" p="2.5" my="2.5" h="auto">
            <Text pl="2" fontSize="20px" w="10">
              &infin;
            </Text>
            <Text ml="0.5" w="32vw">
              Song
            </Text>
            <Text w="32vw">Artist</Text>
            <Text w="32vw">Album</Text>
          </HStack>
          <Divider />
          {props.children}
        </Container>
      ) : null}
    </Container>
  );
};

export default ElementContainer;
