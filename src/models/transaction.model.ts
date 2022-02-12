import { TransactionEntity } from "../entities/transaction.entity";
import database from "../database/database";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

export class TransactionModel {
  private static repository: Repository<TransactionEntity>;

  public static async getTransactions(): Promise<TransactionEntity[]> {
    TransactionModel.repository = await database
      .getConnection()
      .getRepository(TransactionEntity);
    return await TransactionModel.repository.find();
  }

  public static async getTransaction(transactionId: string): Promise<TransactionEntity> {
    TransactionModel.repository = await database
      .getConnection()
      .getRepository(TransactionEntity);
    return await TransactionModel.repository.findOne({ transactionId: transactionId });
  }

  public static async getTransactionsUser(userId: string): Promise<TransactionEntity[]> {
    TransactionModel.repository = await database
      .getConnection()
      .getRepository(TransactionEntity);
    return await TransactionModel.repository.find({ userId: userId });
  }

  public static async getTransactionByParams(userId: string, productId: string, datetransaction: Date, typetransaction: string): Promise<TransactionEntity> {
    TransactionModel.repository = await database
      .getConnection()
      .getRepository(TransactionEntity);
      const transactionListByUserId: TransactionEntity[] = await TransactionModel.repository.find({userId: userId});
      const transactionListByProductId: TransactionEntity[] = await TransactionModel.repository.find({productId: productId});
      var transaction = null;
      for(let i = 0; i < transactionListByUserId.length; i++)
      {
        for(let j = 0; j < transactionListByProductId.length; j++)
        {
          if(transactionListByUserId[i].userId == transactionListByProductId[j].userId  && transactionListByProductId[j].userId == userId
            && transactionListByUserId[i].productId == transactionListByProductId[j].productId && transactionListByProductId[j].productId == productId)
          {
            if(transactionListByUserId[i].datetransaction.getTime() === transactionListByProductId[j].datetransaction.getTime() 
            && transactionListByProductId[j].datetransaction.getTime() === new Date(datetransaction).getTime()
            && transactionListByUserId[i].typetransaction == transactionListByProductId[j].typetransaction
            && transactionListByProductId[j].typetransaction == typetransaction)
            {
              transaction = transactionListByUserId[i];
            }
          }
        }
      }
      return transaction;
  }


  public static async saveTransaction(req: Request): Promise<boolean> {
    const transaction: TransactionEntity = new TransactionEntity();
    transaction.transactionId = uuidv4(); //genera un identificador
    transaction.quantity = req.body.quantitySelected;
    const price = req.body.price;
    if(price.substr(price.length - 1) == "€")
    {
      transaction.price = price.slice(0,-1);
    }
    else
    {
      transaction.price = price;
    }
    transaction.datetransaction = req.body.datetransaction;
    transaction.typetransaction = req.body.typetransaction;
    transaction.userId = req.body.userId;
    transaction.productId = req.body.productId;
    try {
      TransactionModel.repository = await database
        .getConnection()
        .getRepository(TransactionEntity);
      const transactionAux: TransactionEntity = await TransactionModel.getTransactionByParams(transaction.userId, transaction.productId, transaction.datetransaction, transaction.typetransaction);
      if(!transactionAux)
      {
        await TransactionModel.repository.save(transaction);
        return true;
      }
      else
      {
        console.log("Ya existía un registro de la transacción.");
        return false;
      }
    } catch (error) {
      console.log("Error al insertar la transacción: " + error);
      return false;
    }
  }

  public static async updateTransaction(req: Request): Promise<boolean> {
    try {
      TransactionModel.repository = await database
        .getConnection()
        .getRepository(TransactionEntity);
      const transaction: TransactionEntity = await TransactionModel.getTransaction(req.body.transactionId);
      transaction.quantity = req.body.quantity;
      transaction.price = req.body.price;
      transaction.datetransaction = req.body.datetransaction;
      transaction.typetransaction = req.body.typetransaction;
      transaction.userId = req.body.userId;
      transaction.productId = req.body.productId;
      await TransactionModel.repository.save(transaction);
      return true;
    } catch (error) {
      console.log("Error al actualizar la transacción: " + error);
      return false;
    }
  }

  public static async deleteTransaction(TransactionId: string): Promise<boolean> {
    const TransactionData: TransactionEntity = await this.getTransaction(TransactionId);
    if (TransactionData) {
      try {
        TransactionModel.repository = await database
          .getConnection()
          .getRepository(TransactionEntity);
        await TransactionModel.repository.delete(TransactionData.transactionId);
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }
}
