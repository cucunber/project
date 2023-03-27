import { IParagraph } from "./paragraph.type";
import { Text } from '@chakra-ui/react';

export function Paragraph({ paragraph }: IParagraph){
    return (
        <Text as="p" sx={{
            fontSize: '16px',
        }}>{paragraph}</Text>
    )
}