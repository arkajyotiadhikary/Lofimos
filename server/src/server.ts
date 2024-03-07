import app from "./app";
import { sequelize } from "./db";

// connect database
sequelize
      .authenticate()
      .then(() => {
            console.log("Connection to the database has been established successfully.");
      })
      .catch((error: any) => {
            console.error("Unable to connect to the database:", error);
      });

// port
const parsedPort: number = parseInt(process.env.PORT || "", 10);
const port: number = isNaN(parsedPort) ? 2526 : parsedPort;

app.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`);
});
