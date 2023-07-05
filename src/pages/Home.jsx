import {useState,useEffect} from 'react'
import Releases from '../components/Releases'
import FeaturedPlaylists from '../components/FeaturedPlaylists'
import Recommendations from '../components/Recommendations'
import Greeting from '../components/Greeting'

const Home = () => {
  const hash = window.location.hash
  const [token,setToken] = useState('')
  const [country,setCountry] = useState('')
  

  useEffect( () => {
    if(hash){
      setToken(hash.substring(1).split('&')[0].split('=')[1])
      localStorage.setItem('accessToken',token)
    }
  })
  
  return (
    <div className='home'>
        <Greeting/>
        <Releases/>
        <FeaturedPlaylists/>
        <Recommendations/>
    </div>
  )
}

export default Home