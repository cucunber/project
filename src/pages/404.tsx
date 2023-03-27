import { container } from "@/constants";
import { Button, Center, Container, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container
      {...container}
      sx={{
        marginTop: 20,
      }}
    >
      <VStack>
        <Text
          sx={{
            fontSize: "48px",
            fontWeight: 500,
          }}
        >
          Такой страницы пока еще нет
        </Text>
        <Button as={Link} href="/">
          Вернуться на главную
        </Button>
      </VStack>
    </Container>
  );
}
