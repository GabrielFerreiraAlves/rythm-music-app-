import React from 'react'
import {useEffect,useState} from 'react'
import styled from 'styled-components'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import {Link} from 'react-router-dom'

const Image = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 0 auto !important;
    @media(max-width: 700px){
      width: 150px;
      height: 150px;
  }
`
const Title = styled.h1`
    color: #fff;
    font-size: 26px;
    margin: 10px !important;
`
const ArtistName = styled.p`
    color: #fff;
    font-weight: 500;
    text-align: center;
`

const RelatedArtists = ({id}) => {
    const [artists,setArtists] = useState([])

    const token = localStorage.getItem('accessToken')
    const headers = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const url = `https://api.spotify.com/v1/artists/${id}/related-artists`

    useEffect(() => {
        fetch(url,headers)
        .then(res => res.json())
        .then(data => setArtists(data.artists))
    },[id])

    const breakpoints = {
        100: {
          slidesPerView: 1.3
        },
        350: {
            slidesPerView: 2.2
        },
        400: {
            slidesPerView: 2.5
        },
        500: {
          slidesPerView: 2.8
        },
        700: {
          slidesPerView: 3.4
        },
        900: {
          slidesPerView: 4.4
        },
        1100: {
          slidesPerView: 6
        }
      }

  return (
    <div>
        <Title>Artistas Relacionados</Title>
        <Swiper modules={[Navigation]} navigation={true} slidesPerView='6' breakpoints={breakpoints}>
        {artists && artists.map(el => (
            <SwiperSlide key={el.id}>
                <Link to={`/artist/${el.id}`}>
                    <Image src={el.images[1].url} alt=""/>
                    <ArtistName>{el.name}</ArtistName>
                </Link>
            </SwiperSlide>
        ))}
        </Swiper>
    </div>
  )
}

export default RelatedArtists