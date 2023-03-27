import { IAnchor } from "../anchor/anchor.type";
import { IImage } from "../image/image.type";
import { IParagraph } from "../paragraph/paragraph.type";
import { IText } from "../text/text.type";
import { ITitle } from "../title/title.type";

export type ElementsMap =
  | { type: "title"; properties: ITitle }
  | { type: "paragraph"; properties: IParagraph }
  | { type: "anchor"; properties: IAnchor }
  | { type: "text", properties: IText } 
  | { type: "image", properties: IImage };

export interface IGrid {
  elements: ElementsMap[];
}

export type ElementsByType = Record<ElementsMap["type"], any>;
