import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";

import {Category} from "../modules/categories/category.model";

require("dotenv").config();
const {DB_HOST, DB_NAME, DB_USER, DB_PASS} = process.env;

const sequelize = {
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: DB_HOST,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      models: [Category],
      synchronize: true,
      autoLoadModels: true,
    }),
  ],
};

@Module(sequelize)

export class DatabaseModule {}