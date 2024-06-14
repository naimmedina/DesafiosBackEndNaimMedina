import { Router } from "express";
import productsRouter from './products.routes.js'
import cartsRouter from './carts.routes.js'
import sessionRouter from "./session.routes.js"
import { isLogin } from "../middlewares/isLogin.middleware.js";


const router = Router()

router.use('/products',isLogin, productsRouter)
router.use('/carts', cartsRouter)
router.use('/session', sessionRouter)

export default router