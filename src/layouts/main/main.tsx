import { Footer, Header } from "@/sections";
import { Flex } from "@chakra-ui/react";
import { IMainLayout } from "./main.type";

export function MainLayout({ children }: IMainLayout) {
  return (
    <Flex direction="column" sx={{ minHeight: '100vh '}}>
      <Header />
      {children}
      <Footer />
    </Flex>
  );
}
