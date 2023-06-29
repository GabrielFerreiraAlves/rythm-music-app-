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
        width: 90%;
    }
`
const AlbumContainer = styled.div`
    @media(max-width: 800px){
        margin-top: 25px !important;
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

  return (
    <div style={{width: '40%'}}>
        <Swiper modules={[Navigation]} navigation={true} slidesPerView='1'>
            {albums && albums.map(el => (
                <SwiperSlide>
                    <Image src={el.images[0].url}/>
                    <AlbumName>{el.name}</AlbumName>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default ArtistAlbums