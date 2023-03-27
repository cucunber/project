import { Box, Container, Flex, Link, Spinner } from "@chakra-ui/react";
import { IHeader } from "./header.type";
import { default as LinkNext } from "next/link";
import { colors, container } from "@/constants";
import { Fragment } from "react";
import { dataRoutes, IMenuResponse } from "@/data";
import { defaultFetcher } from "@/utils";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Placement } from "../placement";
import { Logo } from "@/components";

function LinkElement({ route, name }: IHeader["options"][number]) {
  const router = useRouter();

  const isLinkActive =
    router.asPath === route ||
    (router.asPath.startsWith(route) && route !== "/");

  return (
    <Link
      as={LinkNext}
      href={route}
      sx={{
        textDecoration: "none",
        color: isLinkActive ? colors.primary : colors.base,
        display: "inline-block",
        padding: "16px 32px",
        position: "relative",
        fontSize: "18px",
        _after: {
          content: '""',
          position: "absolute",
          bottom: "0",
          left: "0",
          height: "4px",
          width: "100%",
          maxWidth: isLinkActive ? "100%" : "0",
          background: colors.primary,
          transition: "0.25s ease-in-out",
        },
        _hover: {
          textDecoration: "none",
          _after: {
            maxWidth: "100%",
          },
        },
      }}
    >
      {name}
    </Link>
  );
}

export function Header() {
  const { data, error } = useSWR<IMenuResponse>(
    dataRoutes.menu,
    defaultFetcher
  );

  if (error) return <div>Ошибка</div>;
  if (!data) return <Spinner />;

  const { options } = data;

  return (
    <Box as="header">
      <Container {...container}>
        <Flex sx={{ padding: 2 }}>
          <LinkNext href="/">
            <Logo />
          </LinkNext>
          <Box sx={{ marginLeft: "auto" }}>
            <Placement />
          </Box>
        </Flex>
        <Container maxW="800px">
          <Flex as="nav" align="center" justify="center">
            {options.map((option) => (
              <Fragment key={option.route}>
                <LinkElement {...option} />
              </Fragment>
            ))}
          </Flex>
        </Container>
      </Container>
    </Box>
  );
}
