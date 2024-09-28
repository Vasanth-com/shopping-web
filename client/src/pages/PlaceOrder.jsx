import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {navigate,backendURL,token,cartItems,setCartItems,deliveryFee,products,getCartAmount} = useContext(ShopContext)

  const [method,setMethod] = useState('cod')
  const [formData,setFormData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    city:"",
    street:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  console.log(method);
  
  
  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prev => ({
      ...prev, [name]:value
    }))
  }
  
  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      
      let orderItems = [];
      
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(item => item._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      
      let orderData = {
        address: formData,
        items:orderItems,
        amount:getCartAmount() + deliveryFee
      }
      
      switch(method){
        // cash on delivery api 
        case "cod": 
          const res = await axios.post(backendURL + "/api/order/place",orderData,{headers:{token}})
          console.log(res.data);
          
          if(res.data.success){
            setCartItems({})
            navigate("/orders")
          }else {
            toast.error(res.data.message)
          }
          break;
        case "stripe":
          const resStripe = await axios.post(backendURL + "/api/order/stripe",orderData,{headers:{token}})
          console.log(resStripe.data);
          
          if(resStripe.data.success){
            const {session_url} = resStripe.data  
            window.location.replace(session_url)
          }else {
            toast.error(resStripe.data.message)
          }

        break;

        default:
          break;
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
        
        {/* left side */}
        <div className='flex flex-col gap-4 w-full sm:w-[480px]'>

          <div className='text-xl sm:text-2xl my-3'>
              <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
          </div>

          <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='firstname' value={formData.firstname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
              <input required onChange={onChangeHandler} name='lastname' value={formData.lastname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
          <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
              <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
          </div>
          <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip Code' />
              <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
          </div>
              <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
        </div>

        {/* right side */}

        <div className='mt-8'>
            <div className='mt-8 min-w-80'>
              <CartTotal/>
            </div>

            <div className='mt-12'>
              <Title text1={"PAYMENT"} text2={"METHOD"}/>
              <div className='flex gap-3 flex-col  lg:flex-row'>
                <div className='flex items-center gap-3 border px-3 p-2 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe'? 'bg-green-400':''}`}></p>
                  <img onClick={()=>setMethod('stripe')} className="h-5 mx-4" src={assets.stripe_logo} alt="" />
                </div>
               
                {/* <div className='flex items-center gap-3 border px-3 p-2 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay'? 'bg-green-400':''}`}></p>
                  <img onClick={()=>setMethod('razorpay')} className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
                </div> */}
               
                <div className='flex items-center gap-3 border px-3 p-2 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod'? 'bg-green-400':''}`}></p>
                  <p onClick={()=>setMethod('cod')} className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                </div>
              </div>
              
              <div className='w-full text-end mt-8'>
                  <button className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
              </div>
            </div>
        </div>
    </form>
  )
}

export default PlaceOrder
