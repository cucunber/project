import { IText } from "./text.type";
import { Text as ChakraText } from "@chakra-ui/react";

export function Text({ text, styles }: IText) {
  return (
    <ChakraText
      sx={{
        fontSize: "16px",
        ...styles,
      }}
    >
      {text}
    </ChakraText>
  );
}
