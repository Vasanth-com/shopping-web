import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/StoreContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  
  const {products , search, showSearch} = useContext(ShopContext)
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubcategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e)=>{

    if(category.includes(e.target.value)){
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }else {
      setCategory(prev => [...prev , e.target.value])
    }
  }

  const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setSubcategory(prev => prev.filter(item => item !== e.target.value))
    }else {
      setSubcategory(prev => [...prev , e.target.value])
    }
  }

  const applyFilter = () =>{
    let productCopy = products.slice();

    if(showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productCopy);
  }

  const sortProduct = () =>{
    let fpCopy = filterProducts.slice();
    switch(sortType){
      case "low-high":
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)))
        break;
      default:
        applyFilter()
        break;
    }
  }


  
  useEffect(()=>{
    
    console.log(category);
    console.log(subCategory);
    applyFilter()
    
  },[category,subCategory,search,showSearch,products])
  useEffect(()=>{
    console.log(sortType);
    
      sortProduct()
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* filter options */}

      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        </p>
        {/* category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'hidden' :''}`}>
              <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                  <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={"Men"} onChange={toggleCategory} />
                    MEN
                  </p>
                  <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={"Women"} onChange={toggleCategory} />
                    WOMEN
                  </p>
                  <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={"Kids"} onChange={toggleCategory} />
                    KIDS
                  </p>
              </div>
        </div>

        {/* Subcate category */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? 'hidden':''}`}>
              <p className='mb-3 text-sm font-medium'>TYPE</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                  <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={"Topwear"} onChange={toggleSubCategory} />
                    TOPWEAR 
                  </p>
                  <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={"Bottomwear"} onChange={toggleSubCategory} />
                    BOTTOMWEAR
                  </p>
                  <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={"Winterwear"} onChange={toggleSubCategory} />
                    WINTERWEAR
                  </p>
              </div>
        </div>
      </div>
        {/* right side  */}

        <div className='flex-1'>

          <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={"ALL"} text2={"COLLECTIONS"}/>
                {/* product sort */}

                <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                  <option value="relavent">Sort by: Relavent</option>
                  <option value="low-high">Sort by: Low to High</option>
                  <option value="high-low">Sort by: High to Low</option>
                </select>
          </div>

          {/* Map products */}

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filterProducts.map((item,idx)=>(
                <ProductItem key={idx} id={item._id} name={item.name} price={item.price} image={item.image}/>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default Collection
