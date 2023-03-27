import { container } from "@/constants";
import { Mailer, Navigation } from "@/sections";
import { Box, Container, HStack } from "@chakra-ui/react";
import { IServicesLayout } from "./services.type";

export function ServicesLayout({ elements, children }: IServicesLayout) {
  return (
    <Container {...container}>
      <HStack
        sx={{
          marginTop: 8,
        }}
        spacing={16}
        align="flex-start"
      >
        <Box
          sx={{
            flex: "0 0 300px",
            position: "sticky",
            top: "20px",
          }}
        >
          <Navigation elements={elements} />
        </Box>
        <Box>
          {children}
          <Box sx={{
            margin: '32px 0'
          }}>
            <Mailer />
          </Box>
        </Box>
      </HStack>
    </Container>
  );
}
