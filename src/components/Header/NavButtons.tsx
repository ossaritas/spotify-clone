import { NavigateFunction, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Container, HStack, Button } from "@chakra-ui/react";

const NavButtons = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <Container
      opacity="80%"
      zIndex="sticky"
      position="fixed"
      top="0"
      p="0"
      maxW="full"
      bgGradient={"linear(to-t, #000000,  #3d3d3d)"}
    >
      <HStack pl="5" h="16">
        <Button
          w="8"
          h="8"
          bgColor="transparent"
          _hover={{ transform: "scale(1.1)" }}
          className="hover:scale-110"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon style={{ width: "30px", height: "30px" }} />
        </Button>

        <Button
          w="8"
          h="8"
          bgColor="transparent"
          _hover={{ transform: "scale(1.1)" }}
          className="hover:scale-110"
          onClick={() => navigate(1)}
        >
          <ArrowForwardIosIcon style={{ width: "30px", height: "30px" }} />
        </Button>
      </HStack>
    </Container>
  );
};

export default NavButtons;
