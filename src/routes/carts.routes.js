import { Router } from "express";
//import cartManager from '../managers/cartsManager.js'
import cartDao from "../dao/mongoDao/cart.dao.js";

const router = Router()

//config solicitudes/peticiones
router.post('/', newCart)
router.get('/:cid', cartlist)
router.post('/:cid/product/:pid', addproductTocart)
router.delete('/:cid/product/:pid', deleteproductIncart)
router.get('/:cid', cartbyid)
router.get('/:cid', cartUpdate)
router.delete('/:cid', deleteAllproducts)
//config callbacks

async function newCart(req, res) {
    try {
        const cart = await cartDao.create();
        res.status(201).json(cart);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, response: error.message });
    }
}

async function cartlist (req, res) {
    try{
        const {cid} = req.params;
        const cart = await cartDao.getById(cid)
        if (cart) {
            return res.json({ status: 200, response: cart });
          } else {
            const error = new Error("Not found!");
            error.status = 404;
            throw error;
          }
    }catch (error) {
        console.log(error);
        return res.json({
          status: error.status || 500,
          response: error.message || "ERROR",
        })
    }
}

async function addproductTocart (req, res) {
    try {
        const {cid, pid} = req.params
        const cart = await cartDao.addProductToCart(cid, pid)
        if (cart) {
            return res.json({ status: 201, response: cart });
          } else {
            const error = new Error("Not found!");
            error.status = 404;
            throw error;
          }
    }catch (error) {
        console.log(error);
        return res.json({
          status: error.status || 500,
          response: error.message || "ERROR",
        })
    }
}

async function deleteproductIncart (req, res) {
  try {
    const { cid, pid } = req.params;
    const cart = await cartDao.deleteproductIncart(cid, pid);
    if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
}

async function cartbyid (req, res) {
  try {
    const { cid } = req.params;
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
}

async function cartUpdate(req, res) {
  try {
    const { cid } = req.params;
   
    const cart = await cartDao.update(cid, body);
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
  
}

async function deleteAllproducts (req, res) {
  try {
    const { cid } = req.params;
   
    const cart = await cartDao.deleteAllProductsInCart(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
  
}

export default router