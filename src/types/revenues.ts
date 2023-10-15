export type GetRevenuesResponse = {
  id: string;
  idUser: string;
  item: string;
  count: number;
  priceYang: number;
  priceWon: number;
};
export type RevenuesResponse =
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
