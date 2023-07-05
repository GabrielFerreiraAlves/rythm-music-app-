import {useEffect,useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Image = styled.img`
    width: 300px;
    object-fit: cover;
    display: block;
    margin: 0 auto !important;
    @media(max-width: 500px){
      width: 200px;
    }
    @media(max-width: 300px){
      width: 95%;
    }
`
const Title = styled.h1`
    color: #fff;
    font-size: 26px;
    margin: 10px !important;
`

const FeaturedPlaylists = () => {
    const [playlists,setPlaylists] = useState([])

    const token = localStorage.getItem('accessToken')
    const headers = {
      headers:{
          Authorization: `Bearer ${token}`
      }
    }

    const url = 'https://api.spotify.com/v1/browse/featured-playlists'  

    useEffect(() => {
        fetch(url,headers)
        .then(res => res.json())
        .then(data => setPlaylists(data.playlists.items))
    },[])

    const breakpoints = {
      100: {
        slidesPerView: 1
      },
      350: {
        slidesPerView: 1.6
      },
      400: {
        slidesPerView: 1.3
      },
      500: {
        slidesPerView: 1.6
      },
      580: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 2.4
      },
      900: {
        slidesPerView: 2.8
      },
      1100: {
        slidesPerView: 4
      }
    }

  return (
    <div>
      <Title>Nossas playlists</Title>
      <Swiper modules={[Navigation]} navigation={true} slidesPerView='4' breakpoints={breakpoints}>
       {playlists.map( el => (
        <SwiperSlide key={el.id}>
          <Link to={`/playlist/${el.id}`}>
            <Image src={el.images[0].url} alt=""/>
          </Link>
        </SwiperSlide>
       ))}
      </Swiper>
    </div>
  )
}

export default FeaturedPlaylists