const Cart = require('../models/cartModel');
const Product= require('../models/productModel');
const mongoose=require('mongoose');

exports.createCart = async (req, res) => {
    const { user_id } = req.user; // Change req.user to req.body
    const { product_id, quantity } = req.body; // Add quantity

    try {
        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            cart = new Cart({
                user_id,
                products: [
                    {
                        product_id,
                        quantity,
                    },
                ],
            });
        } else {
            const productIndex = cart.products.findIndex(
                (prod) => prod.product_id === product_id
            );

            if (productIndex === -1) {
                cart.products.push({ product_id, quantity });
            } else {
                cart.products[productIndex].quantity = quantity;
            }
        }

        await cart.save();
        res.status(200).json({ message: "Product added/updated in cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getCart = async (req, res) => {
    const { user_id } = req.params; 
    let cart = await Cart.findOne({ userId: user_id });
    console.log(cart);

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
     try {
        let subtotal = 0;
        const cartItems = await Promise.all(
            cart.products.map(async (product) => {
                console.log("product id:", product.product_id);
                const productDetails = await Product.findOne({ id: product.product_id });
                console.log(productDetails);
                subtotal += productDetails.price * product.quantity;
                return {
                    product_id: productDetails.id,
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    // image: productDetails.image,
                    quantity: product.quantity,
                };
            })
        );
        console.log(cartItems);
        return res.status(200).json({ cartItems: cartItems, subtotal });
     } catch (error) {
         console.error("error:", error);
        return res.status(500).json({ message: "Server error", error });
     }
}

exports.deletecart = async (req, res) => {
    const { user_id } = req.user;
     const  product_id = req.params.id;
     const cart = await Cart.findOne({ user_id });
     if (!cart) {
         return res.status(404).json({ message: "Cart not  found" });
     }
     try{
     const isProductvalid=cart.products.find(
        (product)=>product_id===product.product_id
     );
     if(!isProductvalid){
        return res.status(200).json({ message: "Product not found in cart" });
     }
     if(cart.products.length<=1){
        await Cart.deleteOne({ user_id });
            return res.status(200).json({ message: "Cart is deleted" });
     }else{
        cart.products=cart.products.filter((pro)=>pro.product_id!==product_id)
        cart.save();
        res.status(200).json({message:"product deleted successfully"})
     }
    }catch(err){
        res.status(500).json({ message: "Error", err });
    }
}