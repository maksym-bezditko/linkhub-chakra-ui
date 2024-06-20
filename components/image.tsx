"use client";

import { Box, Center, Spinner } from "@chakra-ui/react";
import { default as NextImage } from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  borderRadius?: string | number;
  objectFit?: "cover" | "contain";
  alt?: string;
  boxShadow?: string;
};

export const Image = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    src,
    borderRadius = 'none',
    objectFit = "cover",
    width = 200,
    height = 200,
    fill = false,
    alt = "image",
    boxShadow = "none",
  } = props;

  return (
    <Box
      mb={4}
      borderRadius={borderRadius}
      position="relative"
      flexGrow={1}
      width={fill ? "100%" : width}
      height={height}
      overflow="hidden"
      boxShadow={boxShadow}
    >
      <NextImage
        src={src}
        objectFit={objectFit}
        alt={alt}
        priority
        fill
        onLoadingComplete={() => setIsLoading(false)}
      />

      {isLoading && (
        <Box
          position="absolute"
          w="full"
          h="full"
          top="0"
          left="0"
          zIndex={100}
          bg="rgba(255, 255, 255, 0.5)"
        >
          <Center w="full" h="full">
            <Spinner size="xl" />
          </Center>
        </Box>
      )}
    </Box>
  );
};
