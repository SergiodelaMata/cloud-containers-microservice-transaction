import { TransactionEntity } from "../entities/transaction.entity";
import { v4 as uuidv4 } from "uuid";
import database from "../database/database";

export class DataGenerator {
  static async createTransactions() {
    const transactions: TransactionEntity[] = await database
      .getConnection()
      .getRepository(TransactionEntity)
      .find();
    if (transactions.length === 0) {
      const transaction1: TransactionEntity = new TransactionEntity();
      transaction1.transactionId = uuidv4();
      transaction1.quantity = 2;
      transaction1.datetransaction = new Date("2021-11-10")
      transaction1.typetransaction = "Vender";
      transaction1.price = 10;
      transaction1.userId = "b47c585c-70f4-473e-bf3b-f20fd9bde114";
      transaction1.productId = "998575ef-1736-46f0-ba89-a18825eb05ec";
      
      const transaction2: TransactionEntity = new TransactionEntity();
      transaction2.transactionId = uuidv4();
      transaction2.quantity = 2;
      transaction2.price = 20;
      transaction2.datetransaction = new Date("2022-01-12")
      transaction2.typetransaction = "Comprar";
      transaction2.userId = "b47c585c-70f4-473e-bf3b-f20fd9bde114";
      transaction2.productId = "b4c0e6f7-f76e-4a88-85f1-a2c823db831c";
      try {
        await database
          .getConnection()
          .getRepository(TransactionEntity)
          .save([transaction1, transaction2]);
        console.log("Transactions created");
      } catch (error) {
        console.log("Error: " + error.message);
      }
      
    } else {
      console.log("There are already transactions on database, skipping...");
    }
  }
}
