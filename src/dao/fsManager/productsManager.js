import fs from "fs";

class ProductManager {
    constructor() {
        this.products = [];
        this.productId = 1;
        this.pathfile = './src/data/fs/products.json'
    }

    //Metodo addProduct
    addProduct = async (product) => {
        const {title, description, price, thumbnail, code, stock} = product
        await this.getProduct
        const newProduct = {
            id: this.productId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status: true
        };

        if (Object.values(newProduct).includes(undefined)) {
            console.log ('Debes llenar todos los campos')
            return
        }

        this.products.push(newProduct);
        this.productId++;
        await fs.promises.writeFile(this.pathfile, JSON.stringify(this.products));
    }

    //Metodo getProduct
    getProduct = async () => {
        const productJson = await fs.promises.readFile (this.pathfile, 'utf8');
        this.products = JSON.parse(productJson) || [];
        
        return this.products
    }

    //Metodo getProductByID
    getProductById = async (id) => {
        await this.getProduct();
    
        const productId = parseInt(id);
        const product = this.products.find(product => product.id === productId);
    
        if (product) {
            console.log("Producto encontrado:", product);
            return product;
        } else {
            console.error("No se encontró ningun producto con el id:", productId);
        }
    }

    //Metodo UpdateProduct
    updateProduct = async (id, dataProduct) => {
        await this.getProduct();
      
        const productId = parseInt(id);
        const productIndex = this.products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...dataProduct };
            await fs.promises.writeFile(this.pathfile, JSON.stringify(this.products));
            console.log(`Producto con ID ${productId} actualizado correctamente.`);
            return this.products[productIndex]; // Devuelve el producto actualizado
        } else {
            console.log(`No se encontró ningún producto con el ID ${productId} para actualizar.`);
            throw new Error(`No se encontró ningún producto con el ID ${productId} para actualizar`);
        }
    }
    //Metodo deleteProduct
    deleteProduct = async (id) =>{
        await this.getProduct();
        
        const productId = parseInt(id);
        
        this.products = this.products.filter(product => product.id !== productId);
        
        await fs.promises.writeFile(this.pathfile, JSON.stringify(this.products));
        console.log(`El producto con el id ${productId} se eliminó correctamente.`);
    }
    

}

const productManager = new ProductManager()
export default productManager