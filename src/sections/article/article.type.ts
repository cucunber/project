import { ElementsMap, IGrid } from "@/components/grid/grid.type";
import { IList } from "@/components/list/list.type";

export type IArticleMap =
  | ElementsMap
  | { type: "grid"; properties: IGrid }
  | { type: "list"; properties: IList };

export interface IArticle {
  description: IArticleMap[];
}

export type ArticleElementsByType = Record<IArticleMap["type"], any>;
