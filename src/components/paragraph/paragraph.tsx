import { IParagraph } from "./paragraph.type";
import { Text } from '@chakra-ui/react';

export function Paragraph({ paragraph }: IParagraph){
    return (
        <Text sx={{
            fontSize: '16px',
        }}>{paragraph}</Text>
    )
}