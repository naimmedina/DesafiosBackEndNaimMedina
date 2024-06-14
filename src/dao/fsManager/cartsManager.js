import fs from "fs";

class cartmanager {
    constructor(){
        this.pathfile = './src/data/fs/carts.json';
        this.carts = [];
    }
    
    // Método GetCarts
    getCarts = async () => {
        try {
            const cartsJson = await fs.promises.readFile(this.pathfile);
            this.carts = JSON.parse(cartsJson) || [];
        } catch (error) {
            this.carts = [];
        }
        return this.carts;
    }

    // Método CreateCarts
    createCart = async () => {
        await this.getCarts();
        const newCart = {
            id: this.carts.length + 1,
            products: []
        }
        this.carts.push(newCart);
        await fs.promises.writeFile(this.pathfile, JSON.stringify(this.carts));
    
        return newCart;
    }

    getCartsbyID = async (id) => {
        await this.getCarts();
        const cartId = parseInt (id);
        const cart = this.carts.find(cart => cart.id === cartId)

        if (cart) {
            console.log('Producto encontrado', cart)
            return cart;
        } else {
            console.log("No se encontró ningun producto con el id:", cartId)
        }
    }

    addProductToCart = async (id, pid) => {
        await this.getCarts();
        const cartId = parseInt(id);
        const index = this.carts.findIndex(cart => cart.id === cartId);
        if (index === -1) return `No se encontró el carrito con el id ${id}`;
    
        const existingProductIndex = this.carts[index].products.findIndex(product => product.product === pid);
        if (existingProductIndex !== -1) {
            this.carts[index].products[existingProductIndex].quantity++;
        } else {
            this.carts[index].products.push({
                product: pid,
                quantity: 1
            });
        }
        await fs.promises.writeFile(this.pathfile, JSON.stringify(this.carts));
    
        return this.carts[index];
    }
    
}

const cartManager = new cartmanager();
export default cartManager;
