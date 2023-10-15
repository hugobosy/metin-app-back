export type GetExpensesResponse = {
  id: string;
  idUser: string;
  item: string;
  count: number;
  priceYang: number;
  priceWon: number;
};

export type ExpenseResponse =
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
