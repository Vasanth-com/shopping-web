import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const {token,setToken,backendURL,navigate} = useContext(ShopContext)
  const [currentState,setCurrentState] = useState('Login');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');


  const onSubmitHandler = async(e) =>{
    e.preventDefault()
    try {
      if(currentState === "Sign Up"){
        const res = await axios.post(backendURL + "/api/user/register",{name,email,password})
        console.log(res.data);
        if(res.data.success){
          setToken(res.data.token)
          localStorage.setItem("token-user",res.data.token)
        }else{
          toast.error(res.data.message)
        }
        
      }else{
        const res = await axios.post(backendURL + "/api/user/login",{email,password})
        console.log(res.data);
        if(res.data.success){
          setToken(res.data.token)
          localStorage.setItem("token-user",res.data.token)
        }else{
          toast.error(res.data.message)
        }

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr  className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
     { currentState === 'Login' ? '':
      <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' className='w-full px-3 py-2 border  border-gray-800' required />
    }
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email address' className='w-full px-3  border py-2 border-gray-800' required />
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" placeholder='Password' className='w-full px-3 py-2 border  border-gray-800' required />

    <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forget Password?</p>
        {
          currentState === "Login" ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> : <p  onClick={()=>setCurrentState('Login')}className='cursor-pointer'>Login Here</p>
        }
    </div>
    <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === "Login" ? "Sign In" : "Sign Up" }</button>
    </form>
  )
}

export default Login
