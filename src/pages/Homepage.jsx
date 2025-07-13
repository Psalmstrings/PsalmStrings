import React from 'react'
import Herobanner from '../component/Herobanner'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import MovieCard from '../component/MovieCard'

function Homepage() {
  return (
    <div>
        <Navbar />
        <Herobanner />
          <MovieCard />
        <Footer />

    </div>
    
  )
}

export default Homepage