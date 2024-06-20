import { authOptions } from "@/lib/authOptions";
import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import BLANK_POST_IMAGE from "@/public/posts/example.jpg";
import { Post } from "@/components/post";
import { Post as PostType } from "@/types/responses";

const MOCK_POST: PostType[] = [
  {
    id: 1,
    location: "Kharkiv",
    postImage: BLANK_POST_IMAGE.src,
    caption: "lorem isasdsav j n klsjdnv nkjasdn kjnasldkj lkjdnajs sd",
  },

  {
    id: 2,
    location: "Kharkiv",
    postImage: BLANK_POST_IMAGE.src,
    caption: "lorem isasdsav j n klsjdnv nkjasdn kjnasldkj lkjdnajs sd",
  },

  {
    id: 3,
    location: "Kharkiv",
    postImage: BLANK_POST_IMAGE.src,
    caption: "lorem isasdsav j n klsjdnv nkjasdn kjnasldkj lkjdnajs sd",
  },

  {
    id: 4,
    location: "Kharkiv",
    postImage: BLANK_POST_IMAGE.src,
    caption: "lorem isasdsav j n klsjdnv nkjasdn kjnasldkj lkjdnajs sd",
  },
];

export default async function Home() {
  const session = await getServerSession(authOptions);

  const isLoggedIn = Boolean(session?.user);

  return (
    <Container maxW="container.lg">
      <Box p={8}>
        <Heading as="h1" size="xl" mb={20}>
          Feed
        </Heading>

        {isLoggedIn ? (
          <Flex flexDirection="column" alignItems="center" gap={16}>
            {MOCK_POST.map((item) => (
              <Post
                key={item.id}
                post={item}
                ownerNickname={session?.user.nickname || ""}
              />
            ))}

            <Link href="/my-profile">
              <Button mt={4} colorScheme="teal">
                Go to my profile{" "}
              </Button>
            </Link>
          </Flex>
        ) : (
          <Flex gap={4}>
            <Link href="/login">
              <Button mt={4} colorScheme="teal">
                Log in
              </Button>
            </Link>

            <Link href="/signup">
              <Button mt={4} colorScheme="yellow">
                Sign up
              </Button>
            </Link>
          </Flex>
        )}
      </Box>
    </Container>
  );
}
