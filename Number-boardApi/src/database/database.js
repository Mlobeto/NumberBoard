// src/database/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno desde un archivo .env
dotenv.config();

// export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'postgres',
//   logging: false,  // puedes activar esto para ver las consultas SQL en la consola
// });
export const sequelize = new Sequelize(process.env.DB_DEPLOY, {
  logging: false,
  native: false,
  dialect: 'postgres',
});

