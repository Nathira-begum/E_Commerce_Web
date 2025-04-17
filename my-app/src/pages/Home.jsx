import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import WebFlashSale from '../components/WebFlashSale'
import TrendingCategories from '../components/TrendingCategories'
import CategoryHoverShowcase from '../components/CategoryHoverShowcase'
import NewArrivals from '../components/NewArrivals'
import FeaturedCollections from '../components/FeaturedCollections'
import SeasonalOffers from '../components/SeasonalOffers'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
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
