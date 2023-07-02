import {useEffect,useState} from 'react'
import Cookies from 'js-cookie'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Image = styled.img`
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
const AlbumName = styled.p`
  color: #fff !important;
  margin-top: 10px !important;
  font-weight: 500;
  font-size: 17px;
  text-align: center
`
const ArtistName = styled.p`
    color: #474747;
    text-align: center;
`
const Title = styled.h1`
    color: #fff;
    font-size: 26px;
    margin: 10px !important;
`

const Releases = () => {
    const [releaseSingle,setReleaseSingle] = useState([])
    const token = Cookies.get('accessToken')
    const headers = {
      headers:{
          Authorization: `Bearer ${token}`
      }
    }
    const url = 'https://api.spotify.com/v1/browse/new-releases'  

    useEffect(() => {
        fetch(url,headers)
        .then(res => res.json())
        .then(data => setReleaseSingle(data.albums.items))
    },[])

    const singles = releaseSingle.filter( el => el.album_type === 'single')
    const albums = releaseSingle.filter( el => el.album_type === 'album')

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
        550: {
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
    <Title>Novos singles</Title>
        <Swiper modules={[Navigation]} navigation={true} slidesPerView='4' breakpoints={breakpoints}>
        {singles.map(el => (
            <SwiperSlide key={el.id}>
                <Link to={`/album/${el.id}`}>
                <Image src={el.images[1].url} alt=""/>
                <AlbumName>{el.name}</AlbumName>
                <ArtistName>{el.artists[0].name}</ArtistName>
                </Link>
            </SwiperSlide>
        ))}
        </Swiper>
        <Title>Novos albums</Title>
        <Swiper modules={[Navigation]} navigation={true} slidesPerView='4' breakpoints={breakpoints}>
        {albums.map(el => (
            <SwiperSlide key={el.id}>
                <Link to={`/album/${el.id}`}>
                    <Image src={el.images[1].url} alt=""/>
                    <AlbumName>{el.name}</AlbumName>
                    <ArtistName>{el.artists[0].name}</ArtistName>
                </Link>
            </SwiperSlide>
        ))}
        </Swiper>
    </div>
  )
}

export default Releases