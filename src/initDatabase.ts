import database from "./database/database";
import { DataGenerator } from "./services/dataGenerator.service";

database.initDatabase().then(async () => {
  await DataGenerator.createTransactions();
});
