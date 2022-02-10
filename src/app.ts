import database from "./database/database";
import app from "./server/server";
import { DataGenerator } from "./services/dataGenerator.service";

database.initDatabase().then(async() => {
  await DataGenerator.createTransactions();
  app.listen(process.env.PORT, () => {
    return console.log(
      `${new Date()} server is listening on ${process.env.PORT}`
    );
  });
});