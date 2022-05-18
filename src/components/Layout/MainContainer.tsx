import { Grid, Container } from "@chakra-ui/react";

const MainContainer = (props: { className?: string; children?: any }) => {
  return (
    <Container maxW="full" h="100vh" p={"0"}>
      <Grid
        h="full"
        templateRows="1.8fr 0.2fr"
        templateColumns="0.1fr 1.9fr"
        gap="0"
        bgColor="gray.700"
        overflow="auto"
      >
        {props.children}
      </Grid>
    </Container>
  );
};

export default MainContainer;
