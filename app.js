import express from 'express'
import { sequelize } from './database/conecta.js'
import { Cliente } from './models/Cliente.js'
import { Produto } from './models/Produto.js'
import { Compra } from './models/Compra.js'
import { ProdutosCompra } from './models/ProdutosCompra.js'
import cors from 'cors'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
// app.use(routes)
// app.use(express.static('images'));


async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem sucedida.');

    await Cliente.sync({ alter: true})          //A MAE PRECISA CRIAR PRIMEIRO PQ ELA É A DONA DA FOREIGN KEY - vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Clientes: Ok!")

    await Produto.sync()         //vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Produtos: Ok!")

    await Compra.sync({alter: true})         //vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Compras: Ok!")

    await ProdutosCompra.sync({ force: true })         //vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Compras de Produto: Ok!")

    await sequelize.authenticate();
    console.log('Conexão bem sucedida.');
  } catch (error) {
    console.error('Impossível conectar ao banco de dados:', error);
  }
}
conecta_db()

app.listen(port, () => {
  console.log(`API da Floricultura I Can By Myself Flowers ${port}`)
})

app.get('/', (req, res) => {
  res.send(
    console.log(`API da Floricultura I Can By Myself Flowers ${port}`)
  );
});

