import app from './app.js';
import { sequelize } from './database/database.js';
import dotenv from 'dotenv';
import { insertNumbers } from './scripts/InsertNumbers.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(async () => {
  console.log('Database synced successfully');
  
  await insertNumbers();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT} 🚀`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});


