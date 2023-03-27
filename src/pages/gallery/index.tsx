import { Image, Title } from "@/components";
import { colors, container } from "@/constants";
import { galleryRoutes, IGalleryResponse } from "@/data";
import { NextIcon, PrevIcon } from "@/icons";
import { getFetchUrl } from "@/utils";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack,
  Text,
  Spacer,
  Container,
  Card,
  CardBody,
  IconButton,
} from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Fragment, useCallback, useState } from "react";

function GalleryModal({
  src,
  description,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: IGalleryResponse["gallery"][number] &
  ReturnType<typeof useDisclosure> & {
    onNext: () => void;
    onPrev: () => void;
  }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton sx={{ background: colors.color }} />
        <ModalBody
          sx={{
            padding: 4,
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: -2,
              background: colors.color,
              transform: "translateY(-50%)",
            }}
            aria-label="prev-button"
            onClick={onPrev}
            icon={<PrevIcon />}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: -2,
              background: colors.color,
              transform: "translateY(-50%)",
            }}
            aria-label="next-button"
            onClick={onNext}
            icon={<NextIcon />}
          />
          <VStack>
            <Box
              sx={{
                width: "100%",
                height: "600px",
                zIndex: -1,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <Image src={src} alt={description} />
            </Box>
            <Spacer />
            <Text>{description}</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default function Gallery({
  gallery,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isOpen, onOpen, onClose, ...rest } = useDisclosure();
  const [modalElement, setModalElement] = useState({
    index: 0,
    element: gallery[0],
  });

  const handleModalClick = useCallback(
    (modalElement: {
        element: IGalleryResponse["gallery"][number];
        index: number;
      }) =>
      () => {
        setModalElement(modalElement);
        onOpen();
      },
    [onOpen]
  );

  const handleNextSlideClick = useCallback(() => {
    const { index } = modalElement;
    if (index + 1 <= gallery.length - 1) {
      setModalElement({
        index: index + 1,
        element: gallery[index + 1],
      });
      return;
    }
    setModalElement({
      index: 0,
      element: gallery[0],
    });
  }, [gallery, modalElement]);

  const handlePrevSlideClick = useCallback(() => {
    const { index } = modalElement;
    if (index - 1 >= 0) {
      setModalElement({
        index: index - 1,
        element: gallery[index - 1],
      });
      return;
    }
    setModalElement({
      index: gallery.length - 1,
      element: gallery[gallery.length - 1],
    });
  }, [gallery, modalElement]);

  return (
    <Fragment>
      <Container {...container}>
        <Title
          styles={{
            marginTop: 8,
          }}
          title="ГАЛЕРЕЯ"
        />
        <Box
          sx={{
            display: "grid",
            gridGap: 4,
            gridTemplateColumns: "repeat(auto-fit, minmax(min-content, 400px))",
            width: "100%",
            marginBottom: 16,
          }}
        >
          {gallery.map((element, index) => (
            <Card
              sx={{ cursor: "pointer" }}
              onClick={handleModalClick({ index, element })}
              key={element.src}
            >
              <CardBody>
                <Image height="400px" {...element} alt={element.description} />
                <Text
                  sx={{
                    marginTop: 8,
                  }}
                >
                  {element.description}
                </Text>
              </CardBody>
            </Card>
          ))}
        </Box>
      </Container>
      <GalleryModal
        {...modalElement.element}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onPrev={handlePrevSlideClick}
        onNext={handleNextSlideClick}
        {...rest}
      />
    </Fragment>
  );
}

interface GetServerSideProperties {
  gallery: IGalleryResponse["gallery"];
}

export const getServerSideProps: GetServerSideProps<
  GetServerSideProperties
> = async (context) => {
  try {
    const response = await fetch(getFetchUrl(galleryRoutes.gallery));
    const { gallery }: IGalleryResponse = await response.json();
    return {
      props: {
        gallery,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
