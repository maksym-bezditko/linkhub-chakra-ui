"use client";

import { revalidateCachedPath } from "@/actions";
import { loginFormSchema } from "@/lib/schemas";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (
    values: Required<z.infer<typeof loginFormSchema>>
  ) => {
    try {
      revalidateCachedPath("/", "page");

      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.status == 200) {
        router.push("/");
      } else {
        setError("root.login", {
          type: "custom",
          message: "Wrong credentials",
        });
      }
    } catch (error) {
      setError("root.login", { type: "custom", message: "Wrong credentials" });
    }
  };

  return (
    <Container maxW="container.lg">
      <Box p={8}>
        <Heading as="h1" size="xl" noOfLines={1} mb={8}>
          Log in to your account
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={4} isInvalid={!!errors?.email}>
            <FormLabel htmlFor="email">Email</FormLabel>

            <Input
              id="email"
              placeholder="Email"
              {...register("email")}
              isInvalid={!!errors?.email}
            />

            <FormErrorMessage>{errors?.email?.message || ""}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={!!errors?.password}>
            <FormLabel htmlFor="password">Password</FormLabel>

            <Input
              id="password"
              placeholder="Password"
              {...register("password")}
              type="password"
              isInvalid={!!errors?.password}
              autoComplete="new-password"
            />

            <FormErrorMessage>
              {errors?.password?.message || ""}
            </FormErrorMessage>
          </FormControl>

          {errors?.root && (
            <Text color="red.500">{errors?.root.login.message || ""}</Text>
          )}

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}
