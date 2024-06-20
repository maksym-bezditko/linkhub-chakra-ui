"use client";

import { Post as PostType } from "@/types/responses";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Image } from "./image";
import DEFAULT_POST_IMAGE from "@/public/posts/blank-post-image.svg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { LuBookmarkMinus, LuBookmarkPlus } from "react-icons/lu";

type Props = {
  post: PostType;
  ownerNickname: string;
};

const LIKE_STYLES = {
  height: 50,
  width: 50,
  transition: "all 1s",
  color: "rgb(247,53,123)",
  cursor: "pointer",
};

const BOOKMARK_STYLES = {
  height: 50,
  width: 50,
  transition: "all 1s",
  color: "black",
  cursor: "pointer",
};

const LIKE_COUNT = 35;

export const Post = (props: Props) => {
  const {
    post: { postImage, location, caption },
    ownerNickname,
  } = props;

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleIsLiked = () => setIsLiked((prev) => !prev);
  const toggleIsBookmarked = () => setIsBookmarked((prev) => !prev);

  return (
    <Card
      maxW="lg"
      minH={600}
      w="full"
      borderWidth={2}
      borderStyle="solid"
      borderColor="#dbdbdb94"
      boxShadow="lg"
      borderRadius={6}
    >
      <CardBody display="flex" flexDirection="column">
        <Image
          src={postImage || DEFAULT_POST_IMAGE.src}
          alt="Post image"
          borderRadius={6}
          fill
        />

        <Stack mt="6" spacing="3" flexGrow={0} flexShrink={1}>
          <Heading size="md">{ownerNickname}</Heading>

          <Text noOfLines={2} fontSize="md">
            {caption}
          </Text>

          {location && <Text fontSize="sm">Location: {location}</Text>}

          <Flex justifyContent="space-between" alignItems="center" gap={1}>
            <Flex alignItems="center" gap={1}>
              {isLiked ? (
                <AiFillHeart style={LIKE_STYLES} onClick={toggleIsLiked} />
              ) : (
                <AiOutlineHeart style={LIKE_STYLES} onClick={toggleIsLiked} />
              )}

              <Text>{LIKE_COUNT} likes</Text>
            </Flex>

            <Box>
              {isBookmarked ? (
                <LuBookmarkMinus
                  style={BOOKMARK_STYLES}
                  onClick={toggleIsBookmarked}
                />
              ) : (
                <LuBookmarkPlus
                  style={BOOKMARK_STYLES}
                  onClick={toggleIsBookmarked}
                />
              )}
            </Box>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};
