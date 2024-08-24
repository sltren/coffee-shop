import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        height: "100%",
        margin: 0,
        padding: 0,
      },
      "#root": {
        height: "100%",
      },
    },
  },
  components: {
    Scroll: {
      baseStyle: {
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#A0AEC0",
          borderRadius: "24px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#718096",
        },
      },
    },
  },
});
