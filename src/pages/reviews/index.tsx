import { Title } from "@/components";
import { container } from "@/constants";
import { ReviewResponse, reviewRoutes } from "@/data";
import { Article } from "@/sections";
import { getFetchUrl } from "@/utils";
import {
  Card,
  CardBody,
  Container,
  HStack,
  Spacer,
  VStack,
  Text
} from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Fragment } from "react";

export default function Reviews({
  reviews,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container {...container} sx={{
        marginTop: 6,
    }}>
      <VStack
        sx={{
          width: "100%",
        }}
        align="flex-start"
      >
        <Title title="ОТЗЫВЫ" />
        <VStack align="flex-start">
          {reviews.map((review) => (
            <Fragment key={review.createdAt}>
              <Card sx={{}}>
                <CardBody>
                  <HStack justify="space-between">
                    <Title title={review.author.name} />
                    <Text>
                        {new Date(review.createdAt).toLocaleDateString()}
                    </Text>
                  </HStack>
                  <Article description={review.review.description} />
                </CardBody>
              </Card>
              <Spacer />
            </Fragment>
          ))}
        </VStack>
        <Spacer />
        <Spacer />
        <Spacer />
      </VStack>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<ReviewResponse> = async (
  context
) => {
  try {
    const response = await fetch(getFetchUrl(reviewRoutes.reviews));
    const { reviews }: ReviewResponse = await response.json();
    return {
      props: {
        reviews,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
