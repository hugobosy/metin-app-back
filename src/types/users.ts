export interface GetUsersResponse {
  id: string;
  nick: string;
  email: string;
  password: string;
  isActive: boolean;
}

export type UserResponse =
  | {
      isSuccess: true;
      code?: 201;
    }
  | {
      isSuccess: false;
      code?: 502;
    };

export interface GenerateCodeResponse {
  userID: string;
  code: string;
}
