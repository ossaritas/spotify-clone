import { GridItem } from "@chakra-ui/react";
import { usePalette } from "react-palette";
//bgGradient={`linear(to-b, ${data.darkMuted},  ${data.darkVibrant})`}

const BodyContainer = (props: {
  img?: string;
  className?: string;
  children?: any;
}) => {
  let image: string;
  if (props.img) {
    image = props.img;
  } else {
    image = "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png";
  }
  const { data } = usePalette(image);
  return (
    <GridItem
      h="full"
      pb="0"
      bgGradient={`linear(to-b, ${data.darkMuted},  ${data.darkVibrant})`}
      gridRow="1/2"
      gridColumn="2/3"
      bgColor="gray.700"
      overflowY="scroll"
    >
      {props.children}
    </GridItem>
  );
};

export default BodyContainer;
