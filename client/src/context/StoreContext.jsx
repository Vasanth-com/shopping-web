import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const ShopContext = createContext(null);


const ShopContextProvider = (props) =>{

    const currency = '$';
    const deliveryFee = 10;
    const backendURL = "https://shopping-backend-seven.vercel.app"
    const [search,setSearch] = useState('')
    const [showSearch , setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const navigate = useNavigate();
    const [products,setProducts] = useState([])
    const [token,setToken] = useState('');

    const addToCart = async(itemId,size) =>{
        if(!size){
            toast.error("Select product size")
            return;
        }
        let cartData = structuredClone(cartItems)

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1
            }
        }else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)

        if(token){
            try {
                await axios.post(backendURL + "/api/cart/add",{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const updateQuantity = async(itemId,size,quantity) =>{
            let cartData = structuredClone(cartItems);

            cartData[itemId][size] = quantity;

            setCartItems(cartData)

            if(token){
                try {
                    await axios.post(backendURL +"/api/cart/update",{itemId,size,quantity},{headers:{token}})

                } catch (error) {
                    console.log(error);
                    toast.error(error.message)                    
                }
            }
    }

    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items)
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const getCartCount = () =>{
        let totalCount = 0;
        for(const items in cartItems){ // iterate product
            for(const item in cartItems[items]){  // iterate size
                try {
                    if(cartItems[items][item] >0){
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const getProductsData = async()=>{
        try {
            const res = await axios.get(backendURL +"/api/product/list");
            console.log(res.data);
            if(res.data.success){
                setProducts(res.data.products)
            }else{
                toast.error(res.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const getUserCart = async(token)=>{
        try {
            const res = await axios.post(backendURL +"/api/cart/get",{},{headers:{token}})
            console.log(res.data);
            if(res.data.success){
                setCartItems(res.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token-user')){
            setToken(localStorage.getItem('token-user'))
            getUserCart(localStorage.getItem('token-user'))
        }
    },[])
    const contextValue = {
            products,
            currency,
            deliveryFee,
            search,setSearch,showSearch,setShowSearch,
            cartItems,addToCart,updateQuantity,
            getCartCount,getCartAmount,
            navigate,
            token,setToken,
            backendURL,
            setCartItems
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider