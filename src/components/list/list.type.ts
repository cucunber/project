import { SystemStyleObject } from "@chakra-ui/react";
import { ElementsMap } from "../grid/grid.type"

export interface IList {
    elements: ElementsMap[],
    styles?: SystemStyleObject,
}