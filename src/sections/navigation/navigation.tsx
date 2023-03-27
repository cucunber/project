import { colors } from "@/constants";
import { Box, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { INavigation } from "./navigation.type";

function NavigationItem({ name, route }: INavigation['elements'][number]){
    const router = useRouter();

    const isLinkActive = router.asPath === route;

    return (
        <Box as={Link} href={route} sx={{
            padding: '10px 16px',
            background: colors.primary50,
            color:colors.base,
            display: 'inline-block',
            width: '100%',
            margin: 0,
            position: 'relative',
            _after: {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                transition: '0.25s ease-in-out',
                height: '4px',
                background: colors.primary,
                maxWidth: isLinkActive ? '100%' : '0',
            }
        }}>
            {name}
        </Box>
    )
}

export function Navigation({ elements }: INavigation){
    return (
        <VStack>
            {elements.map((element) => <NavigationItem key={element.route} {...element} />)}
        </VStack>
    )
}