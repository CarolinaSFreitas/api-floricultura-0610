import { Router } from "express"
import { produtosCompraIndex } from "./controllers/produtosCompraController.js"
import { produtosCompraCreate } from "./controllers/produtosCompraController.js"

const router = Router()

// --------------------------------------------------------- ROTAS DE COMPRA PRODUTOS
router.get("/produtos_compra", produtosCompraIndex) //rota pra listagem de compra de produtos
router.post ("/produtos_compra", produtosCompraCreate) //rota pra criar a compra de produtos

export default router