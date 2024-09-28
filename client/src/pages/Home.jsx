import React from 'react'
import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Newsletter from '../components/Newsletter'
const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollections/>
      <BestSeller/>
      <OurPolicy/>
      <Newsletter/>
    </div>
  )
}

export default Home
