import {
  dataRoutes,
  dataServicesRoutes,
  IMenuResponse,
  PagesServicesResponse,
} from "@/data";
import { ServicesLayout } from "@/layouts";
import { Article } from "@/sections";
import { IArticle } from "@/sections/article/article.type";
import { IMenuElement } from "@/types/menu";
import { getFetchUrl } from "@/utils";
import { Spacer } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Fragment, PropsWithChildren } from "react";

export default function Content({
  services,
  content,
}: InferGetServerSidePropsType<typeof getServerSideProps> & PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Услуги</title>
      </Head>
      <ServicesLayout elements={services}>
        {content.map((properties, key) => (
          <Fragment key={key}>
            <Article {...properties} />
            <Spacer />
          </Fragment>
        ))}
      </ServicesLayout>
    </>
  );
}

interface IServerSideProperties {
  services: IMenuElement[];
  content: IArticle[];
}

export const getServerSideProps: GetServerSideProps<
  IServerSideProperties
> = async (context) => {
  const { params } = context;
  const response = await fetch(getFetchUrl(dataRoutes.menu));
  const { options }: IMenuResponse = await response.json();
  const servicesRoutes = options.find((option) => option.route === "/services");

  const resultObject: IServerSideProperties = {
    services: [],
    content: [],
  };

  if (params?.slug) {
    try {
      const pageContentResponse = await fetch(
        getFetchUrl(dataServicesRoutes.subRoute(params.slug as string))
      );
      const pageContent: PagesServicesResponse = await pageContentResponse.json();
      if (pageContent.content) {
        resultObject.content = pageContent.content;
      }
    } catch {
      return { notFound: true };
    }
  }

  resultObject.services = servicesRoutes?.subRoutes
    ? servicesRoutes?.subRoutes
    : [];

  return {
    props: resultObject,
  };
};
