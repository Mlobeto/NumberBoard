import express from 'express';
import { getAllNumbers, selectNumbers, resetNumbers, getAvailableNumbers, getSelectedNumbers} from '../controllers/numberControllers.js';

const router = express.Router();

// Ruta para obtener todos los números
router.get('/', getAllNumbers);
router.get('/available', getAvailableNumbers);
router.get('/selectTrue',getSelectedNumbers)
// Ruta para seleccionar un número
router.post('/select', selectNumbers);
router.post('/reset', resetNumbers);

export default router;



