import { IParagraph } from "./paragraph.type";
import { Text } from '../text/text';

export function Paragraph({ paragraph }: IParagraph){
    return (
        <Text text={paragraph} />
    )
}