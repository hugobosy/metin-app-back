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
      message?: string;
    }
  | {
      isSuccess: false;
      code?: 502;
      message?: string;
    };

export interface GenerateCodeResponse {
  userID: string;
  code: string;
}
