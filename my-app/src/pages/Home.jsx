import React from 'react'
import Navbar from '../components/HomeComponents/Navbar'
import HeroSection from '../components/HomeComponents/HeroSection'
import WebFlashSale from '../components/HomeComponents/WebFlashSale'
import TrendingCategories from '../components/HomeComponents/TrendingCategories'
import CategoryHoverShowcase from '../components/HomeComponents/CategoryHoverShowcase'
import NewArrivals from '../components/HomeComponents/NewArrivals'
import FeaturedCollections from '../components/HomeComponents/FeaturedCollections'
import SeasonalOffers from '../components/HomeComponents/SeasonalOffers'
import Footer from '../components/HomeComponents/Footer'

const Home = () => {
  return (
    <div className='bg-black'>
      <Navbar/>
      <HeroSection/>
      <WebFlashSale/>
      <TrendingCategories/>
      <CategoryHoverShowcase/>
      <NewArrivals/>
      <FeaturedCollections/>
      <SeasonalOffers/>
      <Footer/>
    </div>
  )
}

export default Home
