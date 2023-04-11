import { IText } from "./text.type";
import { Text as ChakraText, useMediaQuery } from "@chakra-ui/react";

export function Text({ text, styles }: IText) {
  const [isTablet, isMobile] = useMediaQuery([
    "(max-width: 1024px)",
    "(max-width: 769px)",
  ]);

  const fontSize = [
    ["18px", "18px"],
    ["16px", "16px"],
  ];
  return (
    <ChakraText
      sx={{
        fontSize: fontSize[+isTablet][+isMobile],
        ...styles,
      }}
    >
      {text}
    </ChakraText>
  );
}
