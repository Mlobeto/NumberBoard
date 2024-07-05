import { useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URL} from './Config';

const SelectedNumbersList = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSelectedNumbers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/numbers/selectTrue`);
        setSelectedNumbers(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrorMessage('No se encontraron números seleccionados.');
        } else {
          console.error('Error al obtener números seleccionados:', error);
          setErrorMessage('Hubo un error al obtener los números seleccionados.');
        }
      }
    };

    fetchSelectedNumbers();
  }, []);

  return (
    <div className="overflow-x-auto">
      {errorMessage ? (
        <div className="text-center text-red-500 font-bold my-4">
          {errorMessage}
        </div>
      ) : (
        <>
          {selectedNumbers.length === 0 ? (
            <div className="text-center text-red-500 font-bold my-4">
              Aún no hay números seleccionados.
            </div>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b-2 border-gray-300 px-4 py-2">Valor</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2">Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {selectedNumbers.map((number, index) => (
                  <tr key={index} className="text-center">
                    <td className="border-b border-gray-200 px-4 py-2">{number.value}</td>
                    <td className="border-b border-gray-200 px-4 py-2">{number.name}</td>
                    <td className="border-b border-gray-200 px-4 py-2">{number.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default SelectedNumbersList;


