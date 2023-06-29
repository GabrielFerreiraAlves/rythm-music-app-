import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import styled from 'styled-components'

const Image = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 0 auto !important;
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

const Recommendations = () => {
    const [topArtist,setTopArtist] = useState([]) //get the top artists of a user
    const [artistId,setArtistId] = useState([]) //get the id of artists from tracks
    const [arrReduce,setArrReduce] = useState([]) //get the reduce array id of theartist Id
    const [recommended,setRecommended] = useState([])

    const token = Cookies.get('accessToken')
    const headers = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }


    useEffect(() => {
        const url = 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5'
        fetch(url,headers)
        .then(res => res.json())
        .then(data => setTopArtist(data.items))
    },[])

    useEffect(() => {
        if(Array.isArray(topArtist) && topArtist.length > 0){
            const idTopArtist = topArtist.map(el => el.id)
            const url = `https://api.spotify.com/v1/recommendations?seed_artists=${idTopArtist}`
            fetch(url,headers)
            .then(res => res.json())
            .then(data => {
                setArtistId(data.tracks.filter(el => el.artists.length > 0).map(el => el.artists[0].id))
            })
        }
    },[topArtist])

    useEffect(() => {
        if (Array.isArray(artistId) && artistId.length > 0) {
            const arr = artistId.reduce((a,e) => {
                if(!a.find(d => d === e)){a.push(e)}
                return a
            }, [])  
            setArrReduce(arr)
        }
    },[artistId])

    useEffect(() => {
        if (Array.isArray(arrReduce) && arrReduce.length > 0) {
            const artists = arrReduce
                const url = `https://api.spotify.com/v1/artists?ids=${artists}`
                fetch(url,headers)
                .then(res => res.json())
                .then(data => {
                    setRecommended(data.artists)
                })
    }},[arrReduce])

    const breakpoints = {
        100: {
          slidesPerView: 1.3
        },
        350: {
            slidesPerView: 1.7
        },
        400: {
            slidesPerView: 1.9
        },
        550: {
          slidesPerView: 2.6
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
        <Title>Para Você</Title>
        <Swiper modules={[Navigation]} navigation={true} slidesPerView='6' breakpoints={breakpoints}>
        {recommended && recommended.map(el => (
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

export default Recommendations