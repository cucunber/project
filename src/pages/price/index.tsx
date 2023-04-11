import { Paragraph, Title } from "@/components";
import { colors, container, priceQueryKeys } from "@/constants";
import { IPrice, IPriceResponse, priceRoutes } from "@/data";
import { getFetchUrl } from "@/utils";
import {
  Box,
  Button,
  Container,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function PriceList({
  prices,
  groups,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <Container {...container}>
      <VStack
        sx={{
          marginTop: 8,
        }}
        align="flex-start"
      >
        <Title title="ЦЕНЫ НА ОКАЗАНИЕ УСЛУГ" />
        <Paragraph paragraph="Обратите внимание, приведенные ниже цены являются усредненными. Для уточнения стоимости по интересующей позиции, пожалуйста, свяжитесь с нами по телефону в Санкт-Петербурге +7 (911) 947 58-28" />
        <Spacer />
        <Text
          sx={{
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          Фильтры по категориям работ
        </Text>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "8px",
            width: "100%",
            marginTop: 8,
          }}
        >
          <Button
            as={Link}
            key="all"
            href={{
              href: router.asPath,
              query: {},
            }}
          >
            Все категории
          </Button>
          {groups.map(({ id, name }) => (
            <Button
              key={id}
              as={Link}
              href={{
                href: router.asPath,
                query: { [priceQueryKeys.group]: id },
              }}
              sx={{
                whiteSpace: 'wrap',
                textAlign: 'center',
                ...(router.query?.[priceQueryKeys.group] === id && {
                  background: colors.primary,
                }),
              }}
            >
              {name}
            </Button>
          ))}
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <VStack
          sx={{
            width: "100%",
            marginTop: 16,
          }}
        >
          {prices.map(({ group, services }) => (
            <Fragment key={group.id}>
              <Table
                variant="striped"
                sx={{
                  width: "100%",
                }}
              >
                <Thead
                  sx={{
                    background: colors.primary50,
                  }}
                >
                  <Tr>
                    <Th>{group.name}</Th>
                    <Th>Цена</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {services.map(({ id, name, price }) => (
                    <Tr key={id}>
                      <Td>{name}</Td>
                      <Td isNumeric>
                        {price.from && "от "}
                        {price.amount}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Spacer />
            </Fragment>
          ))}
        </VStack>
        <Spacer />
        <Box
          sx={{
            padding: "16px 20px",
            borderRadius: 16,
            background: colors.warn,
            color: colors.warnText,
          }}
        >
          <Text>
            В указанную сумму не входит стоимость запасных частей и расходных
            материалов.
          </Text>
        </Box>
        <Spacer />
        <Box
          sx={{
            padding: "16px 20px",
            borderRadius: 16,
            background: colors.warn,
            color: colors.warnText,
          }}
        >
          <Text>
            ** Доставка запчастей, которых не хватает до укомплектовки
            ремонтируемого транспортного средства, может проводиться силами
            заказчика или силами нашей компании. В последнем случае стоимость
            доставки составит 10-20% от стоимости доставляемых запчастей.
          </Text>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
      </VStack>
    </Container>
  );
}

interface IGetServerSideProperties {
  prices: IPrice[];
  groups: IPrice["group"][];
}

export const getServerSideProps: GetServerSideProps<
  IGetServerSideProperties
> = async (context) => {
  try {
    const response = await fetch(getFetchUrl(priceRoutes.price));
    const { prices }: IPriceResponse = await response.json();
    const { query } = context;
    const groups = prices.map((price) => price.group);
    if (query?.[priceQueryKeys.group]) {
      const filteredPrices = prices.find(
        (price) => price.group.id === query[priceQueryKeys.group]
      );
      if (filteredPrices) {
        return {
          props: {
            prices: [filteredPrices],
            groups,
          },
        };
      }
    }
    return {
      props: {
        prices,
        groups,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
