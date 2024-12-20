import ProductSchema from './../schemas/ProductSchema.js';

const productsController = {
    getProducts: async (req, res) => {
        console.log('getProducts() called');
        
        try {
            const products = await ProductSchema.find();
            console.log(products);
            res.status(200).json({ data: products});
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
        }
    },
}

export default productsController;