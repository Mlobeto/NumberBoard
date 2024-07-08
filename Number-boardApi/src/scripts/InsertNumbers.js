import Number from '../models/Number.js';

// Función para insertar números del 000 al 999
export const insertNumbers = async () => {
  try {
    // Borrar registros existentes para limpiar la tabla (opcional)
    await Number.destroy({ where: {} });

    // Generar y guardar números del 000 al 999
    const numbers = [];
    for (let i = 0; i <= 999; i++) {
      numbers.push({
        value: i.toString().padStart(3, '0'),
        selected: false,
        name: null,
        phone: null,
      });
    }

    await Number.bulkCreate(numbers);
    console.log('Números insertados correctamente');
  } catch (error) {
    console.error('Error al insertar números:', error);
  }
};



