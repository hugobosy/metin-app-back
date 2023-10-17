export type ObjectiveResponse =
  | {
      isSuccess: true;
      code: 201;
      message: string;
    }
  | {
      isSuccess: false;
      code: 502;
      message: string;
    };
