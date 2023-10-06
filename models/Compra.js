import { DataTypes } from "sequelize";
import { sequelize } from '../database/conecta.js'
import { Cliente } from "./Cliente.js";

export const Compra = sequelize.define('compra', { // nome da tabela
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    total: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false
    },
});

// após construir a tabela do model, os relacionamentos são feitos fora, SOMENTE NA TABLE COMPRA PQ É A TABELA QUE RECEBE AS FK:

//relacionamento compra-cliente
Compra.belongsTo(Cliente, {
    foreignKey: {
        name: "cliente_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Cliente.hasMany(Compra, {
    foreignKey: "cliente_id"
})

