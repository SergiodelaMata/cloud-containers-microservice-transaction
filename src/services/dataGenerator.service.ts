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
      transaction1.quantity = 40;
      transaction1.datetransaction = new Date("2021-11-10")
      transaction1.typetransaction = "Vender";
      transaction1.price = "59.99";
      transaction1.userId = "23436396-18ff-41c4-b1dd-a4bdb0f1b2d7";
      transaction1.productId = "4d15f45d-f0b7-46c7-a20f-62b51bb3851b";
      
      const transaction2: TransactionEntity = new TransactionEntity();
      transaction2.transactionId = uuidv4();
      transaction2.quantity = 2;
      transaction2.price = "59.99";
      transaction2.datetransaction = new Date("2022-01-12")
      transaction2.typetransaction = "Comprar";
      transaction2.userId = "3190c587-50b6-46a7-90ab-36eec1293296";
      transaction2.productId = "4d15f45d-f0b7-46c7-a20f-62b51bb3851b";

      const transaction3: TransactionEntity = new TransactionEntity();
      transaction3.transactionId = uuidv4();
      transaction3.quantity = 10;
      transaction3.datetransaction = new Date("2022-01-11")
      transaction3.typetransaction = "Vender";
      transaction3.price = "59.99";
      transaction3.userId = "23436396-18ff-41c4-b1dd-a4bdb0f1b2d7";
      transaction3.productId = "53045ab7-8006-408a-9a55-96e1ba14afc2";


      const transaction4: TransactionEntity = new TransactionEntity();
      transaction4.transactionId = uuidv4();
      transaction4.quantity = 4;
      transaction4.datetransaction = new Date("2021-12-29")
      transaction4.typetransaction = "Comprar";
      transaction4.price = "59.99";
      transaction4.userId = "9e53c23c-dd58-4b8b-8182-eb396c79540d";
      transaction4.productId = "4d15f45d-f0b7-46c7-a20f-62b51bb3851b";

      const transaction5: TransactionEntity = new TransactionEntity();
      transaction5.transactionId = uuidv4();
      transaction5.quantity = 2;
      transaction5.datetransaction = new Date("2019-07-01")
      transaction5.typetransaction = "Vender";
      transaction5.price = "10";
      transaction5.userId = "50d49dd8-f893-4d27-a721-8b55f86f6add";
      transaction5.productId = "96630d52-49d5-4fae-bf52-5971159cfad6";

      try {
        await database
          .getConnection()
          .getRepository(TransactionEntity)
          .save([transaction1, transaction2, transaction3, transaction4, transaction5]);
        console.log("Transactions created");
      } catch (error) {
        console.log("Error: " + error.message);
      }
      
    } else {
      console.log("There are already transactions on database, skipping...");
    }
  }
}
