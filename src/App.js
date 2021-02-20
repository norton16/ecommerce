import React, { useState, useEffect } from 'react'
//import Products from './components/Products/Products';
//import Navbar from './components/Navbar/Navbar';
import { Products, Navbar, Cart, Checkout } from './components';
//Commerce instance for backend
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

const App = () => {
    //Hooks to update products & cart
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    //Asynchronous function to fetch products
    //commerce.products.list() returns promise, then destructure data from response
    const fetchProducts = async() => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }
    
    const fetchCart = async() => {
        setCart(await commerce.cart.retrieve()); 
    }

    //Cart expects productId & quantity params, they are passed to API to add item to cart
    const handleAddToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);
        //Cart after item is added
        setCart(response.cart);
    }

    const handleUpdateCartQuantity = async (productId, quantity) => {
        //Destructuring example of above function
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }

    //Set order, update cart, & error handling for PaymentForm
    const refreshCart = async() => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch(error) {
            setErrorMessage(error.data.error.message);
        }
    }

    //Hook empty dependency array = only run on render
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        //Wrap app with Router
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                {/* Switch between Products and Cart */}
                <Switch>
                    {/* Products page is the root or home route */}
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart}
                        handleUpdateCartQuantity={handleUpdateCartQuantity}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout 
                            cart={cart} 
                            order={order} 
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}
                        />
                    </Route>  
                </Switch>
            </div>    
        </Router>
        
    )
}

export default App
