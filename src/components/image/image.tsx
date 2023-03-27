import { IImage } from "./image.type";
import { default as NextImage } from 'next/image';
import { Box } from "@chakra-ui/react";

export function Image({ width = '100%', height = '100%', src, alt, fit = 'cover' }: IImage) {
    return <Box
    sx={{
        position: 'relative',
        width,
        height,
    }}>
        <NextImage fill src={src} objectFit={fit} alt={alt || src} />
    </Box>
}