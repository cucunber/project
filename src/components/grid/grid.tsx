import { Box } from "@chakra-ui/react";
import { useMemo } from "react";
import { Anchor } from "../anchor";
import { Image } from "../image";
import { Paragraph } from "../paragraph";
import { Text } from "../text";
import { Title } from "../title";
import { ElementsByType, IGrid } from "./grid.type";

export function Grid({ elements }: IGrid) {
  const elementMap = useMemo<ElementsByType>(
    () => ({
      title: Title,
      anchor: Anchor,
      paragraph: Paragraph,
      text: Text,
      image: Image,
    }),
    []
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridGap: 4,
        gridTemplateColumns: "repeat(auto-fit, minmax(min-content, 400px))",
        width: '100%',
      }}
    >
      {elements.map(({ type, properties }, index) => {
        const ToRender = elementMap[type];
        return <ToRender key={`${type}-${index}`} {...properties}/>;
      })}
    </Box>
  );
}
