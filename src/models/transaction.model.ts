import { TransactionEntity } from "../entities/transaction.entity";
import database from "../database/database";
import { Repository } from "typeorm";
import { Request } from "express";

export class TransactionModel {
  private static repository: Repository<TransactionEntity>;

  public static async getTransactions(): Promise<TransactionEntity[]> {
    TransactionModel.repository = await database
      .getConnection()
      .getRepository(TransactionEntity);
    return await TransactionModel.repository.find();
  }



}
