const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  database: process.env.DB_NAME,
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true,
    },
  },
  host: process.env.DB_SERVER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
};
