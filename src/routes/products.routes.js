import { Router } from "express";
//import productManager from "../managers/productsManager.js"
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router()

//config solicitudes/peticiones
router.get("/", read);
router.get("/:pid", readbyid);
router.post('/', addproduct)
router.put("/:pid", updateproduct)
router.delete('/:pid', destroyproduct)

//config callbacks
async function read(req, res) {
  try {
     // const { limit } = req.query; 'era usado con fs'
      const {limit, page, sort, category, status} = req.query;
      const options = {
        limit: limit || 10,
        page: page || 1,
        sort: {
          price: sort === "asc" ? 1 : -1,
        },
        lean: true
      };

      if(status) {
        const products = await productDao.getAll({status: status}, options)

        return res.status(200).json({products});
      }

      if(category) {
        const products = await productDao.getAll({category: category}, options)

        return res.status(200).json({products});
      }

      const products = await productDao.getAll ({}, options)

      res.status(200).json({satus: 'success', products})

      // if (limit) {
      //     const limitValue = parseInt(limit);
      //     if (!isNaN(limitValue) && limitValue > 0) {
      //         products = products.slice(0, limitValue);
      //     } else {
      //         throw new Error("El valor del limite debe ser mayor a 0.");
      //     }
      // }

      // if (products.length > 0) {
      //     return res.json({ status: 200, response: products });
      // } else {
      //     return res.json({ status: 404, response: "Not found" });
      // }

  } catch (error) {
      console.log(error);
      return res.json({ status: 500, response: error.message });
  }
}

async function addproduct (req, res) {
  try{
    const product = req.body
    const newProduct = await productDao.create(product)
    return res.json({ status: 201, payload: newProduct })
  } catch {
        const error = new Error("Not found!");
        error.status = 404;
        throw error;
  }
}

async function readbyid(req, res) {
    try {
      const { pid } = req.params;
      const one = await productDao.getById(pid);
      if (one) {
        return res.json({ status: 200, payload: one });
      } else {
        const error = new Error("Not found!");
        error.status = 404;
        throw error;
      }
    } catch (error) {
      console.log(error);
      return res.json({
        status: error.status || 500,
        response: error.message || "ERROR",
      });
    }
}

async function updateproduct (req, res) {
  try{
    const { pid } = req.params;
    const productData = req.body
    const updateProd = await productDao.update(pid, productData)

    if (updateProd) {
      return res.json({ status: 200, payload: updateProd });
    } else {
      const error = new Error("Not found!");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

async function destroyproduct(req, res) {
  try {
    const { pid } = req.params;
    const product = await productDao.deleteOne(pid);
    if(!product) return res.status(404).json({status:'Error', msg: 'Producto no encontrado'})
    return res.json({ status: 201, message: 'Producto Eliminado' })
  } catch {
        const error = new Error("Not found!");
        error.status = 404;
        throw error;
  }
}

export default router