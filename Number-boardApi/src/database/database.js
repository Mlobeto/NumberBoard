// src/database/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno desde un archivo .env
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,  // puedes activar esto para ver las consultas SQL en la consola
});
// const sequelize = new Sequelize(DB_DEPLOY , {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// }
// );
