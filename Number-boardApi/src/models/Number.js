import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

const Number = sequelize.define('Number', {
  value: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  selected: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Number;


