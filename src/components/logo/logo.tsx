import { ILogo } from "./logo.type";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

export function Logo({ width = 150, height = width / 2 }: ILogo) {
  return (
    <Box sx={{ position: "relative", width, height }}>
      <Image src="/assets/logo.jpg" fill alt="Logo" />
    </Box>
  );
}
