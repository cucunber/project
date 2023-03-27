import { Title } from "../title";
import { IAnchor } from "./anchor.type";

export function Anchor({ anchor, ...rest}: IAnchor){
    return <Title href={anchor} {...rest} />
}