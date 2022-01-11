import database from "./database/database";
import app from "./server/server";

database.initDatabase().then(() => {
  app.listen(process.env.PORT, () => {
    return console.log(
      `${new Date()} server is listening on ${process.env.PORT}`
    );
  });
});