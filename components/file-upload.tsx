import React, { useMemo, useRef } from "react";
import { Box, Button, Spinner } from "@chakra-ui/react";
import defaultProfileImage from "@/public/profile/blank-profile-image.jpg";
import type { Image as ImageType } from "@/types/common";
import { LuFileEdit, LuX } from "react-icons/lu";
import Image from "next/image";

type Props = {
  setLocalImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  localImageFile?: File;
  previousImage?: ImageType | null;
  isLoading?: boolean;
  setPreviousImage?: React.Dispatch<React.SetStateAction<ImageType | null>>;
};

export const FileUpload: React.FC<Props> = ({
  isLoading,
  localImageFile,
  previousImage,
  setLocalImageFile,
  setPreviousImage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const imageUrl = useMemo(() => {
    if (previousImage) {
      return previousImage.url;
    }

    return localImageFile
      ? URL.createObjectURL(localImageFile)
      : defaultProfileImage;
  }, [localImageFile, previousImage]);

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      setLocalImageFile(file);
    }
  };

  const handleReset = () => {
    if (!inputRef.current) return;

    setLocalImageFile(undefined);
    inputRef.current.value = "";

    setPreviousImage?.(null);
  };

  return (
    <Box pb={4} display="flex" flexDirection="column" alignItems="center">
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Box
            mb={4}
            rounded="full"
            position="relative"
            width={200}
            height={200}
          >
            <Image
              src={imageUrl}
              objectFit="cover"
              alt="profile image"
              priority
              fill
            />
          </Box>

          <Box display="flex" gap={4}>
            <Button
              colorScheme="teal"
              leftIcon={<LuFileEdit />}
              onClick={handleInputClick}
            >
              Upload avatar image
            </Button>

            <Button colorScheme="red" leftIcon={<LuX />} onClick={handleReset}>
              Reset image
            </Button>
          </Box>

          <input
            type="file"
            className="hidden"
            onChange={handleChange}
            ref={inputRef}
            accept=".jpg, .jpeg, .png, image/*"
            style={{ display: "none" }}
          />
        </>
      )}
    </Box>
  );
};
