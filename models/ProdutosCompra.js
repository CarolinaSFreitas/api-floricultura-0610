import { DataTypes } from "sequelize";
import { sequelize } from '../database/conecta.js'
import { Produto } from "./Produto.js";
import { Compra } from "./Compra.js";

export const ProdutosCompra = sequelize.define('produtos_compra', { // nome da tabela
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    preco_produto: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false
    },
}, {
    tableName: 'produtos_compra',
    timestamps: false
});

// após construir a tabela do model, os relacionamentos são feitos fora, SOMENTE NA TABLE COMPRA PQ É A TABELA QUE RECEBE AS FK:

//relacionamento produtos_compra-compra
ProdutosCompra.belongsTo(Compra, {
    foreignKey: {
        name: "compra_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Compra.hasMany(ProdutosCompra, {
    foreignKey: "compra_id"
})

ProdutosCompra.belongsTo(Produto, {
    foreignKey: {
        name: "produto_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

// no geral, n é necesssario saber (ou melhor, é mto custoso em termos de desempenho) saber em quais notas fiscais 
// um produto consta
// Compra.hasMany(ProdutosCompra, {
//     foreignKey: "compra_id"
// })

