"use client";

import { Controller, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Text,
  Input,
  Button,
  Box,
  Container,
  Textarea,
  RadioGroup,
  Stack,
  Radio,
  Heading,
} from "@chakra-ui/react";
import { signupFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";
import { CreateUserResponse, CreateUserVariables } from "@/types/responses";
import { signIn } from "next-auth/react";
import { client } from "@/lib/client";
import { CREATE_USER_MUTATION } from "@/graphql/queries";
import { FileUpload } from "@/components/file-upload";
import axios from "axios";
import { revalidateCachedPath } from "@/actions";

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    control,
    setError,
  } = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nickname: "",
      email: "",
      bio: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [localImageFile, setLocalImageFile] = useState<File>();

  const onSubmit = async (
    values: Required<z.infer<typeof signupFormSchema>>
  ) => {
    try {
      const input: CreateUserVariables["createUserInput"] = {
        firstName: values.firstName,
        lastName: values.lastName,
        nickname: values.nickname,
        email: values.email,
        bio: values.bio,
        password: values.password,
        birthday: values.birthday.toISOString(),
        sex: values.sex,
      };

      const { data, errors } = await client.mutate<
        CreateUserResponse,
        CreateUserVariables
      >({
        mutation: CREATE_USER_MUTATION,
        variables: { createUserInput: input },
      });

      if (!data || errors) {
        throw new Error("Failed to create user");
      }

      if (localImageFile) {
        const formData = new FormData();

        formData.append("file", localImageFile);

        await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/files/upload-profile-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${data.createUser.accessToken}`,
            },
          }
        );
      }

      revalidateCachedPath("/", "page");

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error: any) {
      console.log(error);

      if (error.message) {
        setError("root.createUser", {
          type: "createUser",
          message: error.message,
        });
      }
    }
  };

  return (
    <Container maxW="container.lg">
      <Box p={8}>
        <Heading as="h1" size="xl" noOfLines={1} mb={14}>
          Become a member of LinkHub!
        </Heading>

        <FileUpload
          setLocalImageFile={setLocalImageFile}
          localImageFile={localImageFile}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={4} isInvalid={!!errors?.firstName}>
            <FormLabel htmlFor="firstName">First name</FormLabel>

            <Input
              id="firstName"
              placeholder="First name"
              autoComplete="given-name"
              {...register("firstName")}
              isInvalid={!!errors?.firstName}
              maxLength={50}
            />

            <FormErrorMessage>
              {errors?.firstName?.message || ""}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors?.lastName}>
            <FormLabel htmlFor="lastName">Last name</FormLabel>

            <Input
              id="lastName"
              placeholder="Last name"
              autoComplete="family-name"
              {...register("lastName")}
              isInvalid={!!errors?.lastName}
              maxLength={50}
            />

            <FormErrorMessage>
              {errors?.lastName?.message || ""}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors?.nickname}>
            <FormLabel htmlFor="nickname">Nickname</FormLabel>

            <Input
              id="nickname"
              placeholder="Nickname"
              {...register("nickname")}
              isInvalid={!!errors?.nickname}
              maxLength={50}
            />

            <FormErrorMessage>
              {errors?.nickname?.message || ""}
            </FormErrorMessage>
          </FormControl>

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

          <FormControl mb={4} isInvalid={!!errors?.bio}>
            <FormLabel htmlFor="lastName">Bio</FormLabel>

            <Textarea
              id="bio"
              placeholder="Bio"
              {...register("bio")}
              resize="none"
              isInvalid={!!errors?.bio}
              maxLength={300}
            />

            <FormErrorMessage>{errors?.bio?.message || ""}</FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors?.birthday}>
            <FormLabel htmlFor="birthday">Birthday</FormLabel>

            <Controller
              control={control}
              name="birthday"
              render={({ field: { onChange, value } }) => (
                <SingleDatepicker
                  name="date-input"
                  date={value}
                  onDateChange={onChange}
                />
              )}
            />

            <FormErrorMessage>
              {errors?.birthday?.message || ""}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors?.sex}>
            <FormLabel htmlFor="birthday">Sex</FormLabel>

            <Controller
              control={control}
              name="sex"
              render={({ field: { onChange, value } }) => (
                <RadioGroup onChange={onChange} value={value}>
                  <Stack direction="row">
                    <Radio value="MALE">Male</Radio>
                    <Radio value="FEMALE">Female</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />

            <FormErrorMessage>{errors?.sex?.message || ""}</FormErrorMessage>
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

          <FormControl mb={4} isInvalid={!!errors?.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>

            <Input
              id="confirmPassword"
              placeholder="Confirm password"
              {...register("confirmPassword")}
              type="password"
              isInvalid={!!errors?.confirmPassword}
              autoComplete="new-password"
            />

            <FormErrorMessage>
              {errors?.confirmPassword?.message || ""}
            </FormErrorMessage>
          </FormControl>

          {errors?.root && (
            <Text color="red.500">{errors?.root.createUser.message || ""}</Text>
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
