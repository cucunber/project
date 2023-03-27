import { CSSProperties } from "react";

export interface IImage {
    width?: string,
    height?: string,
    src: string,
    alt?: string,
    fit?: CSSProperties['objectFit'],
}