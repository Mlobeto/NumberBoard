import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './Config';

const NumberBoard = ({ onSelect }) => {
  const [numbers, setNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [paginationData, setPaginationData] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const numbersPerPage = 100;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/numbers/available?page=${paginationData.currentPage}&limit=${numbersPerPage}`
        );
        if (response.data && response.data.availableNumbers) {
          setNumbers(response.data.availableNumbers);
          setPaginationData({
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
          });
        } else {
          console.error('La respuesta de la API no tiene la estructura esperada:', response.data);
        }
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    };

    fetchNumbers();
  }, [paginationData.currentPage, numbersPerPage]);

  const selectNumber = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPaginationData({ ...paginationData, currentPage: pageNumber });
  };

  const confirmSelection = () => {
    onSelect(selectedNumbers);
    navigate('/form');
  };

  const goToPreviousPage = () => {
    if (paginationData.currentPage > 1) {
      handlePageChange(paginationData.currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (paginationData.currentPage < paginationData.totalPages) {
      handlePageChange(paginationData.currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <div className="py-9 px-8 grid grid-cols-10 gap-2 bg-">
        {numbers.map((num) => (
          <div
            key={num.value}
            className={`w-12 h-12 flex items-center justify-center border rounded cursor-pointer ${
              selectedNumbers.includes(num.value) ? ' bg-amber-300 text-white' : 'bg-white'
            }`}
            onClick={() => selectNumber(num.value)}
          >
            {num.value}
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className="px-3 py-1 border rounded bg-white text-blue-500"
          onClick={goToPreviousPage}
          disabled={paginationData.currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: paginationData.totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`mx-1 px-3 py-1 border rounded ${
              i + 1 === paginationData.currentPage ? ' bg-amber-300 text-white' : 'bg-white text-blue-500'
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded bg-white text-blue-500"
          onClick={goToNextPage}
          disabled={paginationData.currentPage === paginationData.totalPages}
        >
          &gt;
        </button>
      </div>

      {/* Botón de confirmación */}
      <div className="flex justify-center mt-8">
        <button
          className=" text-white py-2 px-4 rounded bg-amber-300 border-spacing-16"
          onClick={confirmSelection}
          disabled={selectedNumbers.length === 0}
        >
          Confirmar Selección
        </button>
      </div>
    </div>
  );
};

NumberBoard.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default NumberBoard;













