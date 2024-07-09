import app from './app.js';
import { sequelize } from './database/database.js';
import dotenv from 'dotenv';
import { insertNumbers } from './scripts/InsertNumbers.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

// Verificar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    
    // Sincronizar la base de datos
    return sequelize.sync({ alter: true });
  })
  .then(async () => {
    console.log('Database synced successfully');
    
    // Insertar números después de sincronizar la base de datos
    await insertNumbers();

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port: ${PORT} 🚀`);
    });
  })
 




