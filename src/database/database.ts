import { Connection, createConnection } from "typeorm";
import { TransactionEntity } from "../entities/transaction.entity";
import dotenv from "dotenv";


export class Database {
  private connection: Connection;

  public async initDatabase() {
    dotenv.config();
    this.connection = await createConnection({
      type: "mysql",
      host: process.env.HOST,
      port: 3308,
      username: process.env.DATABASE_USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [
        TransactionEntity,
      ],
      synchronize:true
    });

    console.log("State connection database: " + this.connection.isConnected);
    return this.connection;
  }

  public getConnection(): Connection {
    return this.connection;
  }
}

const database = new Database();
export default database;
