import { DataTypes } from "sequelize";
import { sequelize } from '../database/conecta.js'

export const Produto = sequelize.define('produto', { // nome da tabela
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
    tipo: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false
    },
    qtd_estoque: {
        type: DataTypes.INTEGER(4),
        allowNull: false
    },
}, {
    timestamps: false
});
