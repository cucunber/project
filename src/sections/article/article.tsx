import { Anchor, Grid, Image, Paragraph, Text, Title, List } from "@/components";
import { Spacer, VStack } from "@chakra-ui/react";
import { Fragment, useMemo } from "react";
import { ArticleElementsByType, IArticle } from "./article.type";

export function Article({ description }: IArticle) {
  const articleMap = useMemo<ArticleElementsByType>(
    () => ({
      title: Title,
      anchor: Anchor,
      paragraph: Paragraph,
      grid: Grid,
      text: Text,
      image: Image,
      list: List,
    }),
    []
  );

  return (
    <VStack align="flex-start" sx={{
      width: '100%',
    }}>
      {description.map(({ type, properties }, index) => {
        const ToRender = articleMap[type];
        return (
          <Fragment key={`${type}-${index}`}>
            <ToRender {...properties} />
            <Spacer />
          </Fragment>
        );
      })}
    </VStack>
  );
}
