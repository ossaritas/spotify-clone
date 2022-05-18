import { extendTheme, ChakraProvider } from "@chakra-ui/react";

const theme = extendTheme({
  shadows: {
    outline: "none",
  },
  components: {
    Button: {
      baseStyle: {
        bg: "transparent",
        backgroundColor: "transparent",
        paddingInlineStart: "0",
        paddingInlineEnd: "0",
        padding: "0",
        marginInlineStart: "0",
        marginInlineEnd: "0",
        margin: "0",
        _active: { bg: "transparent", backgroundColor: "transparent" },
      },
    },
  },
  colors: {
    spotify: {
      g1: "#1db954", //dark green
      g2: "#1ed760", // light green
      bg1: "#012A36", // bakcground 1
      bg2: "#093271", // background 2
      "text-gray": "#B8B8B8",
      footer: "#181818",
      sidebar: "#080808",
    },
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        fontFamily: "Circular, Helvetica, Arial, sans-serif",
        padding: "0",
        margin: "0",
        fontSize: "16px",
        lineHeight: "24px",
        WebkitFontSmoothing: "antialiased",
        cursor: "default",
        color: "white",
      },
    },
  },
});

export const ThemeProvider = (props: { children: any }) => {
  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>;
};

console.log(theme);

export default theme;
