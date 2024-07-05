// src/NumberCard.jsx

import PropTypes from 'prop-types';

const NumberCard = ({ value, selected, onSelect }) => {
  return (
    <div
      className={`p-4 border rounded m-2 ${selected ? 'bg-green-400' : 'bg-blue-200'}`}
      onClick={() => onSelect(value)}
      style={{ cursor: 'pointer' }}
    >
      {value}
    </div>
  );
};

NumberCard.propTypes = {
  value: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default NumberCard;
