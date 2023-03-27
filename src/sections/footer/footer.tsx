import { colors, company, container } from "@/constants";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { Placement } from "../placement";

export function Footer() {
  return (
    <Box
      as="footer"
      sx={{
        background: colors.base,
        padding: 3,
        color: colors.baseInversion,
        marginTop: 'auto',
      }}
    >
      <Container {...container}>
        <Flex justify="space-between">
          <Box>
            <Text as="p" fontSize={18}>
              {new Date().getFullYear()} {company.name}
            </Text>
          </Box>
          <Placement />
        </Flex>
      </Container>
    </Box>
  );
}
