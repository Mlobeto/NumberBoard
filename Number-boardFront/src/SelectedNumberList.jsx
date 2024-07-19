import  { useState, useEffect } from 'react';
import axios from 'axios';
import { generatePDF } from './Form';


const SelectedNumbersList = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  useEffect(() => {
    const fetchSelectedNumbers = async () => {
      try {
        const response = await axios.get('https://numberboard.onrender.com/numbers/selectTrue');
        setSelectedNumbers(response.data);
      } catch (error) {
        console.error('Error al obtener números seleccionados:', error);
      }
    };

    fetchSelectedNumbers();
  }, []);

  const handleDownloadPDF = (number) => {
    const { value, name, phone } = number;
    generatePDF([value], name, phone);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b-2 border-gray-300 px-4 py-2">Valor</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Nombre</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Teléfono</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {selectedNumbers.map((number, index) => (
            <tr key={index} className="text-center">
              <td className="border-b border-gray-200 px-4 py-2">{number.value}</td>
              <td className="border-b border-gray-200 px-4 py-2">{number.name}</td>
              <td className="border-b border-gray-200 px-4 py-2">{number.phone}</td>
              <td className="border-b border-gray-200 px-4 py-2">
                <button
                  onClick={() => handleDownloadPDF(number)}
                  className="bg-blue-500 text-white py-1 px-2 rounded"
                >
                  Descargar PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedNumbersList;

