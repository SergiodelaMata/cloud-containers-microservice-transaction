import { Request } from "express";
import { TransactionEntity } from "../entities/transaction.entity";

export interface GetTransactions {
  transactionData: TransactionEntity | TransactionEntity[];
  logged: boolean;
  userId: string;
}

export interface GetTransaction {
  transactionData: TransactionEntity;
  logged: boolean;
  userId: string;
}
export class TransactionController {
  public static async getTransactions(req: Request): Promise<GetTransactions> {
    return await {
      transactionData: null,
      logged: false,
      userId: null,
    };
  }

  public static async saveTransaction(req: Request): Promise<GetTransaction> {
    return await {
      transactionData: null,
      logged: false,
      userId: null,
    };
  }

  public static async deleteTransaction(req: Request): Promise<boolean> {
    return null;
  }
}
