import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const backendURL = "http://localhost:5000"
export const currency = "$"

const App = () => {

  const [token,setToken] = useState(localStorage.getItem('admin-token')?localStorage.getItem('admin-token'):"");


  useEffect(()=>{
    localStorage.setItem('admin-token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>

   { token === "" 
   ? <Login setToken = {setToken}/>
    : <>
    <Navbar setToken ={setToken}/>
    <hr />
    <div className='flex w-full'>
    <Sidebar/>
    <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-9 text-gray-600 text-base'>
    <Routes>
      <Route path='/add' element={<Add token={token}/>}></Route>
      <Route path='/list' element={<List token={token}/>}></Route>
      <Route path='/order' element={<Orders token={token}/>}> </Route>
    </Routes>
    </div>
    </div>
    </>}
    </div >
  )
}

export default App
