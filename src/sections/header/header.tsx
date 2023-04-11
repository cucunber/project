import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import { IHeader } from "./header.type";
import { default as LinkNext } from "next/link";
import { colors, container } from "@/constants";
import {
  ComponentPropsWithoutRef,
  Fragment,
  useCallback,
  useRef,
  useState,
} from "react";
import { dataRoutes, IMenuResponse } from "@/data";
import { defaultFetcher } from "@/utils";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Placement } from "../placement";
import { Logo } from "@/components";
import BurgerSVG from "./burger";

function LinkElement({
  route,
  name,
  ...rest
}: IHeader["options"][number] & ComponentPropsWithoutRef<"a">) {
  const router = useRouter();

  const [isMobile] = useMediaQuery("(max-width: 1024px)");

  const isLinkActive =
    router.asPath === route ||
    (router.asPath.startsWith(route) && route !== "/");

  return (
    <Link
      as={LinkNext}
      href={route}
      {...rest}
      sx={{
        textDecoration: "none",
        color: isLinkActive ? colors.primary : colors.base,
        display: "inline-block",
        padding: "16px 32px",
        position: "relative",
        fontSize: isMobile ? "24px" : "18px",
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

function MobileMenu({ options }: Pick<IMenuResponse, "options">) {
  const [open, setOpen] = useState(false);
  const burgerButtonRef = useRef(null);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton
        aria-label="burger-button"
        ref={burgerButtonRef}
        onClick={handleOpen}
      >
        <BurgerSVG />
      </IconButton>
      <Drawer
        isOpen={open}
        onClose={handleClose}
        finalFocusRef={burgerButtonRef}
        size={["full", "full", "md"]}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            sx={{
              width: "48px",
              height: "48px",
            }}
          />
          <Container
            sx={{
              height: "100%",
            }}
            maxW="300px"
          >
            <Flex
              as="nav"
              sx={{
                height: "100%",
                p: 2,
              }}
              align="center"
              direction="column"
              justify="center"
            >
              {options.map((option) => (
                <Fragment key={option.route}>
                  <LinkElement onClick={handleClose} {...option} />
                </Fragment>
              ))}
              <Box
                sx={{
                  marginTop: "auto",
                }}
              >
                <Placement />
              </Box>
            </Flex>
          </Container>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function Header() {
  const { data, error } = useSWR<IMenuResponse>(
    dataRoutes.menu,
    defaultFetcher
  );

  const [isMobile] = useMediaQuery("(max-width: 1024px)");

  if (error) return <div>Ошибка</div>;
  if (!data) return <Spinner />;

  const { options } = data;

  return (
    <Box
      as="header"
      sx={{
        background: colors.color,
        zIndex: 2,
        ...(isMobile && { position: "sticky", top: 0 }),
      }}
    >
      <Container {...container}>
        <Flex align="center" sx={{ padding: 2 }}>
          <LinkNext href="/">
            <Logo />
          </LinkNext>
          <Box sx={{ marginLeft: "auto" }}>
            {!isMobile ? <Placement /> : <MobileMenu options={options} />}
          </Box>
        </Flex>
        {!isMobile && (
          <Container maxW="800px">
            <Flex as="nav" align="center" justify="center">
              {options.map((option) => (
                <Fragment key={option.route}>
                  <LinkElement {...option} />
                </Fragment>
              ))}
            </Flex>
          </Container>
        )}
      </Container>
    </Box>
  );
}
