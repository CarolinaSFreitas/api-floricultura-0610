import { sequelize } from "../database/conecta.js"
import { Produto } from "../models/Produto.js"
import { ProdutosCompra } from "../models/ProdutosCompra.js"

//função de get - vai listar as compras de produto 
export async function produtosCompraIndex(req, res) {
    try {
        const pcs = await ProdutosCompra.findAll({
            include: [Produto], //aqui lista as compras de produto e os produtos
        })
        res.status(200).json(pcs)
    } catch (error) {
        res.status(400).send(error)
    }
}

//função create 
export async function produtosCompraCreate(req, res) {
    const { produto_id, compra_id, qtd_estoque, preco } = req.body

    if (!produto_id || !compra_id || !qtd_estoque || !preco ){
        res.status(400).json("Erro... Informe todos os atributos.")
        return
    }

    //inicia a transição
    const t = await sequelize.transaction()

    try {

        //1ª operação da transação (incluir item em produtos_compraa)
        const pc = await ProdutosCompra.create({
            produto_id, compra_id, qtd_estoque, preco
        }, {transaction: t})

        //2ª operação da transação (atualizar/alterar a quantidade de produtos)
        await Produto.decrement('qtd_estoque', { by: qtd_estoque, where: { id: produto_id}, transaction: t})

        //3ª operação da transação (aumentar o total da nota/compra)
        await Compra.increment('total', {
            by: qtd_estoque*preco,
            where: { id: compra_id},
            transaction: t})

        // CONCLUIR a transação
        await t.commit()


        res.status(201).json(pc)
    } catch (error) {
        //caso ocorra algum erro de transação: volta
        await t.rollback()

        res.status(400).send(error)
    }
}
