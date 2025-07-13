import React from 'react'
import HeroBanner from '../component/herobanner'
import MovieRow from '../component/MovieRow'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import MovieCard from '../component/MovieCard'

function Homepage() {
  return (
    <div>
        <Navbar />
        <HeroBanner />
          <MovieCard />
        <Footer />

    </div>
    
  )
}

export default Homepage