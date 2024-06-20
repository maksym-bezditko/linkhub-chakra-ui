import { CHECK_IF_USER_EXISTS_BY_EMAIL, CHECK_IF_USER_EXISTS_BY_NICKNAME } from "@/graphql/queries";
import { client } from "@/lib/client";
import { CheckIfUserExistsByEmailResponse, CheckIfUserExistsByNicknameResponse } from "@/types/responses";

export const checkForEmailExistence = async (
  email: string
): Promise<boolean> => {
  try {
    const { data, error } = await client.query<CheckIfUserExistsByEmailResponse>({
      query: CHECK_IF_USER_EXISTS_BY_EMAIL,
      variables: {
        email,
      },
    });

    if (error || !data || !data.checkIfUserExistsByEmail.exists) {
      throw new Error();
    }

    return true;
  } catch (e) {
    return false;
  }
};

export const checkForNicknameExistence = async (
  nickname: string,
): Promise<boolean> => {
  try {
    const { data, error } =
      await client.query<CheckIfUserExistsByNicknameResponse>({
        query: CHECK_IF_USER_EXISTS_BY_NICKNAME,
        variables: {
          nickname,
        },
      });

    if (error || !data || !data.checkIfUserExistsByNickname.exists) {
      throw new Error();
    }

    return true;
  } catch (e) {
    return false;
  }
};
