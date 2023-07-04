import {useState} from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import {Link} from 'react-router-dom'
import {FiSearch} from 'react-icons/fi'

const MusicImage = styled.img`
  border-radius: 3px;
  object-fit: cover;
`
const MusicName = styled.p`
  color: #fff;
  font-size: 1.1em;
  font-weight: 500; 
  @media(max-width: 500px){
    width: 100%;
    white-space: nowrap;
  }
`
const TrackInfo = styled.p`
  color: #474747;
  @media(max-width: 500px){
    color: #a0a3a2;
  }
`
const TrackContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px !important;
  margin: 5px !important;
  transition: background-color .2s linear;
  cursor: pointer;
  &:hover{
    background-color: #131212;
  }
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  height: 20px;
  margin-left: 10px !important;
`
const Circle = styled.div`
  width: 6px;
  height: 6px;
  background-color: #474747;
  border-radius: 50%;
`
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
const PlaylistImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    display: block;
    margin: 0 auto !important;
`
const ArtistName = styled.p`
    color: #fff;
    font-weight: 500;
`
const DivContainer = styled.div`
  margin: 20px 0px !important;
  @media(max-width: 500px){
    margin: 20px 0px 0px 0px !important;
    overflow-x: hidden;
  }
`
const Input = styled.input`
  background-color: transparent;
  border-radius: 5px;
  border: 2px solid #470050;
  width: 30%;
  height: 45px;
  padding: 5px 5px !important;
  outline: none;
  box-shadow: none;
  caret-color: #470050;
  color: #fff;
  &::placeholder{
    color: #474747;
  }
  @media(max-width: 500px){
    width: 70%;
    margin-right: 10px !important;
  }
`
const Button = styled.button`
  padding: 7px 12px !important;
  background-color: #470050;
  border-radius: 5px;
  border: none;
  color: #fff;
  height: 48px;
  transform: translateY(-1px);
`
const Form = styled.form`
  margin: 10px 0px !important;
`
const ContainerTrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 !important;
  @media(max-width: 500px){
    p:nth-child(1),p:nth-child(2){
      display: none;
    }
  }
`

const Search = () => {
    const [search,setSearch] = useState("")
    const [tracks,setTracks] = useState([])
    const [artists,setArtists] = useState([])
    const [playlist,setPlaylist] = useState([])
    
    const token = Cookies.get('accessToken')
    const headers = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
   function handleSubmit(e){
    e.preventDefault();

    if(search){
      setTracks([])
      setArtists([])

      const url = `https://api.spotify.com/v1/search?q=${search}&type=album,artist,track,playlist`
      fetch(url,headers)
      .then(res => res.json())
      .then(data => {
          if(data){
            setArtists(data.artists.items)
            setTracks(data.tracks.items)
            setPlaylist(data.playlists.items)
          }else{
            return
          }
      }).catch( err => console.error('erro durante a solicitação: ',err))

    }
   }
   

    function convert(time_ms){
        const minutes_duration = time_ms/60000
        const minutes = Math.floor(time_ms/60000)
        const seconds_rest = time_ms%60000
        const seconds = Math.floor(seconds_rest/1000)
        return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`
      }

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

      const artistBreakpoints = {
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
        <Form action="" onSubmit={handleSubmit} className='d-flex justify-content-center' >

        <Input type="text" onChange={e => setSearch(e.target.value)} placeholder="Digite uma palavra-chave"/>
        <Button type="submit"><FiSearch/></Button>
        </Form>
        
        <DivContainer>
          <Swiper modules={[Navigation]} navigation={true} slidesPerView='6' breakpoints={artistBreakpoints}>
            {artists && artists.length > 0 && artists.map(el => (
              <SwiperSlide key={el.id}>
                <Link to={`/artist/${el.id}`}>
                  {el.images[0] && el.images[0].url && <Image src={el.images[0].url} alt="" />}
                  <ArtistName className='text-center'>{el.name}</ArtistName>
                </Link>
              </SwiperSlide>
            
            ))}
          </Swiper>
        </DivContainer>

        <DivContainer>
          <Swiper modules={[Navigation]} navigation={true} slidesPerView='4' breakpoints={breakpoints}>
            {playlist && playlist.length > 0 && playlist.map(el => (
              <SwiperSlide key={el.id}>
                <Link to={`/playlist/${el.id}`}>
                  {el.images[0] && el.images[0].url && <PlaylistImage src={el.images[0].url} alt=""  style={{width: '200px',height: '200px'}}/>}
                  <ArtistName className='text-center'>{el.name}</ArtistName>
                </Link>
              </SwiperSlide>
            
            ))}
          </Swiper>
        </DivContainer>  

        <DivContainer>
          {tracks && tracks.length > 0 && tracks.map(el => (
                  <TrackContainer key={el.id}>
                      {el.album && el.album.images && el.album.images[2].url && <MusicImage src={el.album.images[2].url} alt="" />}
                  
                  <InfoContainer>
                    <MusicName>{el.name}</MusicName>
                    <ContainerTrackInfo>
                      <TrackInfo>{el.album.name}</TrackInfo>
                      <TrackInfo>-</TrackInfo>
                      <TrackInfo>{el.artists[0].name}</TrackInfo>
                      <Circle></Circle>
                      <TrackInfo>{convert(el.duration_ms)}</TrackInfo>
                    </ContainerTrackInfo>
                  </InfoContainer>
              </TrackContainer>
            ))}      
        </DivContainer>    
       
    </div>
  )
}

export default Search