export type CommonResponse = {
  succeeded: boolean;
};

export type ExistsResponse = {
  exists: boolean;
};

export type CheckIfUserExistsByEmailResponse = {
  checkIfUserExistsByEmail: ExistsResponse;
};

export type CheckIfUserExistsByNicknameResponse = {
  checkIfUserExistsByNickname: ExistsResponse;
};

export type TokensResponse = {
  accessToken: string;
  refreshToken: string;
};

export type Sex = "MALE" | "FEMALE";

export type CreateUserVariables = {
  createUserInput: {
    bio: string;
    email: string;
    firstName: string;
    birthday: string;
    lastName: string;
    password: string;
    sex: Sex;
    nickname: string;
  };
};

export type CreateUserResponse = {
  createUser: TokensResponse;
};

export type LoginWithEmailVariables = {
  email: string;
  password: string;
};

export type LoginWithEmailResponse = {
  loginWithEmail: TokensResponse;
};

export type RefreshTokensResponse = {
  refreshTokens: TokensResponse;
};

type Follow = {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
  nickname: string;
};

export type Post = {
  id: number;
  caption: string;
  postImage: string | null;
  location: string | null;
};

export type GetMyProfileResponse = {
  getMyProfile: {
    id: number;
    email: string;
    bio: string | null;
    firstName: string;
    lastName: string;
    sex: Sex;
    birthday: Date;
    nickname: string;
    createdAt: Date;
    profileImage: string | null;
    followers: Follow[];
    following: Follow[];
    posts: Post[];
  };
};
