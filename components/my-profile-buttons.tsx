"use client";

import { Box, Link, ResponsiveValue } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Button from "./button";

type Props = {
  isLoggedIn: boolean;
  mt?: ResponsiveValue<number>;
};

export const MyProfileButtons = (props: Props) => {
  const { isLoggedIn, mt = 0 } = props;

  const handleClick = () =>
    signOut({
      callbackUrl: "/",
      redirect: true,
    });

  return (
    <Box mt={mt}>
      {isLoggedIn ? (
        <Button
          label="Logout"
          size="lg"
          borderRadius="full"
          bg="linear-gradient(141deg, rgba(247,53,123,1) 0%, rgba(244,160,99,1) 95%)"
          handleClick={handleClick}
        />
      ) : (
        <Link href="/login">
          <Button
            label="Login"
            size="lg"
            borderRadius="full"
            bg="linear-gradient(141deg, rgba(247,53,123,1) 0%, rgba(244,160,99,1) 95%)"
          />
        </Link>
      )}
    </Box>
  );
};
