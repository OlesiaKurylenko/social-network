import express from "express";
import cors from "cors";
import { sequelize } from "./services/sequelize";
import { publicRoutes } from "./routes";
import { config } from "dotenv";

config();

const { PORT } = process.env;

export const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.use("/leto", (re, res, next) => {
  res.send("ddddd");
});
app.use("/", publicRoutes);
//app.use("/api", new JWTAuthMiddleware().check, privateRoutes);

export const start = async () => {
  await sequelize.authenticate();

  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`); // mv later todo
  });
};
