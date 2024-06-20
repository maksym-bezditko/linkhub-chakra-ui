"use client";

import { MyProfileButtons } from "@/components/my-profile-buttons";
import { Image } from "@/components/image";
import {
  Center,
  Container,
  Flex,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Spinner,
  Box,
} from "@chakra-ui/react";
import DEFAULT_AVATAR_IMAGE from "@/public/profile/blank-profile-image.jpg";
import { GET_MY_PROFILE_QUERY } from "@/graphql/queries";
import { GetMyProfileResponse } from "@/types/responses";
import { ProfileStat } from "@/components/profile-stat";
import { Post } from "@/components/post";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";

export const dynamic = "force-dynamic";

export default function MyProfile() {
  const { data: session } = useSession();

  const { data } = useQuery<GetMyProfileResponse>(GET_MY_PROFILE_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${session?.user.tokens.accessToken}`,
      },
    },
  });

  const myProfile = data?.getMyProfile;

  return (
    <Container maxW="container.lg" p={4} position="relative" centerContent>
      {myProfile ? (
        <>
          <Center
            position="absolute"
            top="-100px"
            left="50%"
            transform="translateX(-50%)"
          >
            <Image
              src={myProfile.profileImage || DEFAULT_AVATAR_IMAGE.src}
              alt="profile image"
              boxShadow="xl"
            />
          </Center>

          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            w="full"
            pt={28}
            maxW="container.sm"
          >
            <Heading as="h3">
              {myProfile.firstName} {myProfile.lastName}
            </Heading>

            <Text fontSize="sm">@{myProfile.nickname}</Text>

            <Text fontSize="md" pt={6} textAlign="center">
              {myProfile.bio}
            </Text>
          </Flex>

          <Center pt={8} pb={12}>
            <Flex justifyContent="space-between" alignItems="center" gap={4}>
              <ProfileStat value={myProfile.posts.length} label="Posts" />

              <ProfileStat
                value={myProfile.followers.length}
                label="Followers"
              />

              <ProfileStat
                value={myProfile.following.length}
                label="Following"
              />
            </Flex>
          </Center>

          <Tabs isFitted variant="enclosed" w="full">
            <TabList>
              <Tab _selected={{ color: "pink.400" }}>Posts</Tab>
              <Tab _selected={{ color: "pink.400" }}>Followers</Tab>
              <Tab _selected={{ color: "pink.400" }}>Followings</Tab>
            </TabList>

            <TabIndicator
              mt="-1.5px"
              height="3px"
              bg="pink.400"
              borderRadius="1px"
            />

            <TabPanels>
              <TabPanel
                mt={4}
                gridGap={4}
                display="grid"
                gridTemplateColumns="repeat(auto-fit,minmax(250px, 1fr))"
              >
                {myProfile.posts.length === 0 ? (
                  <Center>
                    <Text>No posts yet</Text>
                  </Center>
                ) : (
                  myProfile.posts.map((post) => (
                    <Post
                      key={post.id}
                      post={post}
                      ownerNickname={myProfile.nickname}
                    />
                  ))
                )}
              </TabPanel>

              <TabPanel mt={4}>
                <Center>
                  <Text>Followers are to be implemented</Text>
                </Center>
              </TabPanel>

              <TabPanel mt={4}>
                <Center>
                  <Text>Followings are to be implemented</Text>
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <MyProfileButtons isLoggedIn mt={20} />
        </>
      ) : (
        <>
          <Flex h="30vh" justifyContent="center" alignItems="center">
            <Spinner size="xl" />
          </Flex>
        </>
      )}
    </Container>
  );
}
