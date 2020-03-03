import express from "express";
import cors from "cors";
import { sequelize } from "./services/sequelize";
import { publicRoutes, privateRoutes } from "./routes";
import { config } from "dotenv";
import BasicAuthMiddleware from "./middleware/basic-auth";

config();

const { PORT } = process.env;

export const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/", publicRoutes);
app.use("/api", new BasicAuthMiddleware().check, privateRoutes);

export const start = async () => {
    await sequelize.authenticate();

    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`); // mv later todo
    });
};
