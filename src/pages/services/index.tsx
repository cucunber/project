import { Title } from "@/components";
import { dataRoutes, IMenuResponse } from "@/data";
import { ServicesLayout } from "@/layouts";
import { IMenuElement } from "@/types/menu";
import { getFetchUrl } from "@/utils";
import { Text } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

export default function Services({
  services,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Услуги</title>
      </Head>
      <ServicesLayout elements={services}>
        <Title title="Услуги" />
        <Text>
          Здесь Вы сможете посмотреть все наши услуги
        </Text>
        <Text>
          Выберите пункт меню
        </Text>
      </ServicesLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  services: IMenuElement[];
}> = async (context) => {
  const response = await fetch(getFetchUrl(dataRoutes.menu));
  const { options }: IMenuResponse = await response.json();
  const servicesRoutes = options.find((option) => option.route === "/services");
  if (!servicesRoutes) {
    return {
      props: {
        services: [],
      },
    };
  }
  if (!servicesRoutes.subRoutes) {
    return {
      props: {
        services: [],
      },
    };
  }
  return {
    props: {
      services: servicesRoutes.subRoutes,
    },
  };
};
