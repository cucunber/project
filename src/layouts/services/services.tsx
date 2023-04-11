import { colors, container } from "@/constants";
import { Mailer, Navigation } from "@/sections";
import {
  Box,
  Container,
  HStack,
  IconButton,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { IServicesLayout } from "./services.type";
import TopArrowSVG from "./top";

export function ServicesLayout({ elements, children }: IServicesLayout) {
  const [isMobile] = useMediaQuery("(max-width: 769px)");

  const RenderComponent = isMobile ? VStack : HStack;

  const handleTopButtonClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  return (
    <Container {...container}>
      <RenderComponent
        sx={{
          marginTop: 8,
        }}
        spacing={16}
        align="flex-start"
      >
        <Box
          sx={
            isMobile
              ? {}
              : {
                  flex: "0 0 300px",
                  position: "sticky",
                  top: "20px",
                }
          }
        >
          <Navigation elements={elements} />
        </Box>
        <Box>
          {children}
          <Box
            sx={{
              margin: "32px 0",
            }}
          >
            <Mailer />
          </Box>
        </Box>
        <Box>
          <IconButton
            aria-label="top-arrow"
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              borderRadius: '50%',
              boxShadow: '0px 4px 8px 0px rgba(34, 60, 80, 0.2)',
            }}
            onClick={handleTopButtonClick}
          >
            <TopArrowSVG />
          </IconButton>
        </Box>
      </RenderComponent>
    </Container>
  );
}
