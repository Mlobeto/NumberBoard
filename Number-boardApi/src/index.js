import app from './app.js';
import { sequelize } from './database/database.js';
import dotenv from 'dotenv';

// Cargar variables de entorno desde un archivo .env
dotenv.config();

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(async () => {
  console.log('Database synced successfully');
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT} 🚀`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});



