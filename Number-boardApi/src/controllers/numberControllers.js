import Number from '../models/Number.js';

// Obtener todos los números
// Obtener todos los números ordenados
export const getAllNumbers = async (req, res) => {
  try {
    const numbers = await Number.findAll({
      order: [['value', 'ASC']]
    });
    res.json(numbers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los números', error });
  }
};


// Seleccionar un número
export const selectNumbers = async (req, res) => {
  const { numbers, name, phone } = req.body;

  // Verificar si numbers no es un array
  if (!Array.isArray(numbers)) {
    return res.status(400).json({ message: 'numbers debe ser un array' });
  }

  try {
    // Iterar sobre cada número seleccionado
    for (let value of numbers) {
      const number = await Number.findOne({ where: { value } });

      if (!number) {
        console.log(`Número ${value} no encontrado`);
        continue; // O puedes retornar un error si lo prefieres
      }

      if (number.selected) {
        console.log(`Número ${value} ya seleccionado`);
        continue; // O puedes retornar un error si lo prefieres
      }

      number.selected = true;
      number.name = name;
      number.phone = phone;
      await number.save();
    }

    res.json({ message: 'Números seleccionados correctamente' });
  } catch (error) {
    console.error('Error al seleccionar los números:', error);
    res.status(500).json({ message: 'Error al seleccionar los números', error: error.message });
  }
};

export const getAvailableNumbers = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { count, rows: availableNumbers } = await Number.findAndCountAll({
      where: { selected: false },
      offset,
      limit,
    });

    res.json({
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      availableNumbers,
    });
  } catch (error) {
    console.error('Error al obtener números disponibles:', error);
    res.status(500).json({ message: 'Error al obtener números disponibles', error: error.message });
  }
};

export const getSelectedNumbers = async (req, res) => {
  try {
    const selectedNumbers = await Number.findAll({
      where: { selected: true },
      attributes: ['value', 'name', 'phone'], 
    });
    res.json(selectedNumbers);
  } catch (error) {
    console.error('Error al obtener los números seleccionados:', error);
    res.status(500).json({ message: 'Error al obtener los números seleccionados', error });
  }
};
export const resetNumbers = async (req, res) => {
  try {
    console.log('Reseteando números...');

    // Desmarcar todos los números seleccionados
    const result = await Number.update(
      { selected: false, name: null, phone: null },
      { where: {} }
    );

    console.log('Resultado de la actualización:', result);

    const updatedNumbers = await Number.findAll();
    console.log('Números actualizados:', updatedNumbers);

    res.json({ message: 'Números reseteados correctamente' });
  } catch (error) {
    console.error('Error al resetear los números:', error);
    res.status(500).json({ message: 'Error al resetear los números', error: error.message });
  }
};
