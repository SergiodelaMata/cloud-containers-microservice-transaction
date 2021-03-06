import { Request } from "express";
import { TransactionEntity } from "../entities/transaction.entity";
import { TransactionModel } from "../models/transaction.model";

export interface GetTransactions {
  transactionData: TransactionEntity | TransactionEntity[];
  logged: boolean;
  userId: string;
  rol : string;
}

export interface GetTransaction {
  transactionData: TransactionEntity;
  logged: boolean;
  userId: string;
  rol : string;
}
export class TransactionController {
  public static async getTransactions(req: Request): Promise<GetTransactions> {
    return {
      transactionData: await TransactionModel.getTransactions(),
      logged: false,
      userId: null,
      rol: null,
    };
  }

  public static async getTransaction(req: Request): Promise<GetTransaction> {
    return {
      transactionData: await TransactionModel.getTransaction(req.params.transactionId),
      logged: false,
      userId: null,
      rol: null,
    };
  }

  public static async getTransactionsUser(req: Request): Promise<GetTransactions> {
    return {
      transactionData: await TransactionModel.getTransactionsUser(req.params.userId),
      logged: false,
      userId: null,
      rol: null,
    };
  }

  public static async saveTransaction(req: Request): Promise<boolean> {
    return await TransactionModel.saveTransaction(req);
  }

  public static async updateTransaction(req: Request): Promise<boolean> {
    return await TransactionModel.updateTransaction(req);
  }
}
