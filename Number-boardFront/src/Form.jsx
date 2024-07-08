import { useState } from 'react';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoviaja from './assets/logoviaja.png'; 
import { BASE_URL } from './Config';

const Form = ({ selectedNumbers, onBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendDataToBackend(selectedNumbers, name, phone);
    generatePDF(selectedNumbers, name, phone);
    navigate('/'); 
  };

  const sendDataToBackend = async (numbers, name, phone) => {
    try {
      await axios.post(`${BASE_URL}/numbers/select`, {
        numbers,
        name,
        phone,
      });
      alert('Datos enviados con éxito');
    } catch (error) {
      console.error('Error al enviar datos al backend:', error);
      alert('Error al enviar datos al backend');
    }
  };

  const generatePDF = (numbers, name, phone) => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = logoviaja;
    doc.addImage(img, 'PNG', 10, 10, 40, 40); 

    doc.setFontSize(16);
    const text1 = "-Sorteo el día Jueves 26 de Septiembre  Loteria Bogotá";
    const text2 = "-Sorteo el día Viernes 27 de Septiembre Lotería de Risalralda";
    const text3 = "-Premio mayor Sabado 28 de septiembre Lotería Boyaca";
    const marginLeft = 10;
    const marginTop = 60;
    const lineHeight = 0;

    const text1Lines = doc.splitTextToSize(text1, 180);
    const text2Lines = doc.splitTextToSize(text2, 180);
    const text3Lines = doc.splitTextToSize(text3, 180);

    doc.text(text1Lines, marginLeft, marginTop);
    doc.text(text2Lines, marginLeft, marginTop + text1Lines.length * lineHeight + 10);
    doc.text(text3Lines, marginLeft, marginTop + (text1Lines.length + text2Lines.length) * lineHeight + 20);

    doc.setFontSize(14);
    doc.text(`Números seleccionados: ${numbers.join(', ')}`, 10, marginTop + (text1Lines.length + text2Lines.length + text3Lines.length) * lineHeight + 40);
    doc.text(`Nombre: ${name}`, 10, marginTop + (text1Lines.length + text2Lines.length + text3Lines.length) * lineHeight + 50);
    doc.text(`Teléfono: ${phone}`, 10, marginTop + (text1Lines.length + text2Lines.length + text3Lines.length) * lineHeight + 60);

    doc.save('datos-seleccionados.pdf');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Datos de los números seleccionados</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded py-2 px-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono:</label>
          <input
            type="tel"
            className="mt-1 block w-full border rounded py-2 px-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between">
          <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded" onClick={onBack}>
            Volver
          </button>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Descargar PDF
          </button>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  selectedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Form;









