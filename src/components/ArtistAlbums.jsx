import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import {Link} from 'react-router-dom'

const AlbumName = styled.p`
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    margin-top: 10px !important;
`
const Image = styled.img`
    border-radius: 8px;
    width: 70%;
    object-fit: cover;
    display: block;
    margin: 0 auto !important;
    @media(max-width: 500px){
        width: 200px;
    }
`
const AlbumContainer = styled.div`
    @media(max-width: 800px){
        margin-top: 25px !important;
    }
`
const Div = styled.div`
    width: 40%;
    @media(max-width: 500px){
        width: 100%;
    }
`

const ArtistAlbums = ({id}) => {
    const [albums,setAlbums] = useState([])

    const url = `https://api.spotify.com/v1/artists/${id}/albums`

    const token = Cookies.get('accessToken')
    const headers = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        fetch(url,headers)
        .then(res => res.json())
        .then(data => {
            setAlbums(data.items)
        })
    },[id])

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
          slidesPerView: 1
        },
        700: {
          slidesPerView: 1
        },
        900: {
          slidesPerView: 1
        },
        1100: {
          slidesPerView: 1
        }
      }

  return (
    <Div>
        <Swiper modules={[Navigation]} navigation={true} slidesPerView='1' breakpoints={breakpoints}>
            {albums && albums.map(el => (
                <SwiperSlide>
                    <Image src={el.images[0].url}/>
                    <AlbumName>{el.name}</AlbumName>
                </SwiperSlide>
            ))}
        </Swiper>
    </Div>
  )
}

export default ArtistAlbums