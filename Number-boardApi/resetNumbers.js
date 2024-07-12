// resetNumbers.js
import { sequelize } from './src/database/database.js'; 
import Number from './src/models/Number.js'; 

const resetNumbers = async () => {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Desmarcar todos los números seleccionados
    await Number.update(
      { selected: false, name: null, phone: null }, // Restablecer el estado y campos
      { where: {} } // Sin condiciones para actualizar todos los registros
    );

    console.log('Números reseteados correctamente');
  } catch (error) {
    console.error('Error al resetear los números:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    await sequelize.close();
    console.log('Connection closed.');
  }
};

// Ejecutar la función
resetNumbers();
