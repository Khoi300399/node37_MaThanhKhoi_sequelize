import { Sequelize } from "sequelize";
import config from "../config/config.js";

let { database, user, password, host, port, dialect } = config;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect,
});

export default sequelize;
