import { useMemo } from "react";
import { ElementsByType } from "../grid/grid.type";
import { Anchor } from "../anchor";
import { Image } from "../image";
import { Paragraph } from "../paragraph";
import { Text } from "../text";
import { Title } from "../title";
import { IList } from "./list.type";
import { Box, VStack } from "@chakra-ui/react";

export function List({ elements, styles }: IList) {
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
      as="ul"
      sx={{
        paddingLeft: 8,
        ...styles,
      }}
    >
      {elements.map(({ type, properties }, index) => {
        const ToRender = elementMap[type];
        return (
          <Box as="li" key={`${type}-${index}`}>
            <ToRender {...properties} />
          </Box>
        );
      })}
    </Box>
  );
}
