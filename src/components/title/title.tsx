import { ITitle } from "./title.type";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import { colors } from "@/constants";
import { Image } from "../image";

export function Title({ href, title, icon, styles }: ITitle) {
  const [isTablet, isMobile] = useMediaQuery([
    "(max-width: 1024px)",
    "(max-width: 769px)",
  ]);

  const fontSize = [['32px', '32px'], ['28px', '24px']]
  return (
    <Text
      as={href ? Link : "h2"}
      // @ts-ignore
      href={href as string}
      sx={{
        display: "inline-flex",
        position: "relative",
        fontSize: fontSize[+isTablet][+isMobile],
        paddingLeft: 4,
        lineHeight: 1.25,
        marginTop: 3,
        marginBottom: 3,
        color: href ? colors.primary : "inherit",
        ...styles,
        ...(!icon && {
          _before: {
            content: '""',
            display: "inline-block",
            width: "4px",
            height: "1.2em",
            background: colors.primary,
            position: "absolute",
            bottom: 1.25,
            left: 0,
          },
        }),
      }}
    >
      {icon && (
        <Box
          sx={{
            marginRight: 4,
          }}
        >
          <Image src={icon} width="40px" height="40px" alt={icon} />
        </Box>
      )}
      {title}
    </Text>
  );
}
