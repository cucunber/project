import {
  Box,
  VStack,
  Text,
  Container,
  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
import { Image, Title } from "@/components";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  IPagesHomeMainServicesResponse,
  IPagesHomeServicesResponse,
  pagesHomeRoutes,
} from "@/data";
import { getFetchUrl } from "@/utils";
import { colors, company, container } from "@/constants";
import Link from "next/link";
import { Article, Mailer } from "@/sections";
import { Fragment } from "react";
import { YMaps, Map, ZoomControl, Placemark } from "@pbe/react-yandex-maps";

const servicesPadding = 4;

export default function Home({
  services,
  mainServices,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isMobile] = useMediaQuery("(max-width:769px)");

  console.log(isMobile);

  return (
    <>
      <Head>
        <title>Главная</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack>
        <Box
          sx={{
            height: "100%",
            position: "relative",
            width: "100%",
            background: "url(/assets/backgrounds/main.jpg)",
          }}
        >
          <Box
            sx={{
              padding: servicesPadding,
            }}
          >
            <Container {...container}>
              <Text
                sx={{
                  fontSize: "32px",
                  fontWeight: "500",
                  color: colors.primary,
                }}
              >
                {company.name} оказывает спектр услуг:
              </Text>
              <VStack
                as="ul"
                align="flex-start"
                sx={{
                  width: "100%",
                  listStyle: "none",
                  color: colors.color,
                  fontSize: "20px",
                  marginTop: 4,
                }}
              >
                {services?.map(({ name, route }) => (
                  <Box
                    as="li"
                    key={name}
                    sx={{
                      transition: "0.25s ease-in-out",
                      display: "inline-box",
                      _before: {
                        content: '""',
                        width: 4,
                        height: 4,
                        background: colors.primary,
                        display: "inline-block",
                        marginRight: 4,
                      },
                      _hover: {
                        color: colors.primary,
                      },
                    }}
                  >
                    <Link href={route}>{name}</Link>
                  </Box>
                ))}
              </VStack>
            </Container>
          </Box>
        </Box>
      </VStack>
      <Box>
        <Container {...container}>
          <VStack>
            {mainServices.map((service, key) => (
              <Fragment key={key}>
                <Article {...service} />
                <Spacer />
              </Fragment>
            ))}
          </VStack>
        </Container>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          position: "relative",
        }}
      >
        <Container {...container}>
          <Title title="Где нас найти?" />
        </Container>
        <YMaps query={{ lang: "en_RU" }}>
          <Map
            width="100%"
            height={isMobile ? "400px" : "600px"}
            defaultState={{ center: [59.851101, 30.521924], zoom: 18 }}
          >
            <ZoomControl />
            <Placemark geometry={[59.851101, 30.521924]} />
          </Map>
        </YMaps>
        <Box
          sx={
            isMobile
              ? {
                  position: 'relative',
                  margin: 2,
                  top: -10,
                }
              : {
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "50%",
                }
          }
        >
          <Mailer />
        </Box>
      </Box>
    </>
  );
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<
  IPagesHomeServicesResponse & IPagesHomeMainServicesResponse
> = async (context) => {
  try {
    const requests = [
      fetch(getFetchUrl(pagesHomeRoutes.services)),
      fetch(getFetchUrl(pagesHomeRoutes.mainServices)),
    ];
    const rawResponses = await Promise.allSettled(requests);
    const jsonResponses = await Promise.all(
      rawResponses
        .filter(({ status }) => status === "fulfilled")
        .map(
          async (result) =>
            await (result as PromiseFulfilledResult<Response>).value.json()
        )
    );
    const servicesData = Object.values(jsonResponses).reduce(
      (target, object) => ({ ...target, ...object }),
      {}
    );
    return {
      props: {
        ...servicesData,
      },
    };
  } catch {
    return {
      props: {
        services: [],
        mainServices: [],
      },
    };
  }
};
