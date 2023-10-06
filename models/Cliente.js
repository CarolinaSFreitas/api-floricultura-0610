import { DataTypes } from "sequelize";
import { sequelize } from '../database/conecta.js'

export const Cliente = sequelize.define('cliente', { // nome da tabela
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    fone: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    rg: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
}, {
    timestamps: false
});
