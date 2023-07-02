import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import {BiTimeFive} from 'react-icons/bi'

const AlbumContainer = styled.div`
    margin: 20px 0px !important;
    display: flex;
    align-items: end;
    color: #fff;
    gap: 10px;
    div h1{
        margin-bottom: 10px !important;
    }
    img{
        margin-left: 10px !important;
        border-radius: 8px;
    }
    @media(max-width: 500px){
        display: block;
        text-align: center;
        div h1{
          margin-top: 20px !important;
          font-size: 1.5rem;
        }
    }
`
const AlbumInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    h3{
        font-weight: 400;
        font-size: 20px;
    }
    h3:nth-child(3){
        display: flex;
        align-items: center;
    }
    @media(max-width: 500px){
        justify-content: center;
    }
`

const MusicImage = styled.img`
  border-radius: 3px;
`
const MusicName = styled.p`
  color: #fff;
  font-size: 1.1em;
  font-weight: 500; 
  @media(max-width: 500px){
    white-space: nowrap;
    width: 100%;
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
  overflow-x: hidden;
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

const Album = () => {
    const {id} = useParams()
    const [track,setTrack] = useState([])
    const [album,setAlbum] = useState([])
    const [artist,setArtist] = useState('')

    const token = Cookies.get('accessToken')
    const headers = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        const url = `https://api.spotify.com/v1/albums/${id}`
        fetch(url,headers)
        .then(res => res.json())
        .then(data => {
            if(data){
                setAlbum(data)
                setArtist(data.artists[0].name)
                setTrack(data.tracks.items)
            }
        })
    },[id])
    const total_time = track.map(el => el.duration_ms)
    const sum_time = total_time.reduce( (acc,num) => acc + num , 0)
    
    function convertAlbumTime(ms) {
        let seconds = Math.floor((ms / 1000) % 60)
        let minutes = Math.floor((ms / (1000 * 60)) % 60)
        let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
      
        return hours === 0 ? `${minutes} min` : `${hours} horas ${minutes} min`
      }
      function convertMusicTime(time_ms){
        const minutes_duration = time_ms/60000
        const minutes = Math.floor(time_ms/60000)
        const seconds_rest = time_ms%60000
        const seconds = Math.floor(seconds_rest/1000)
        return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`
      }

  return (
    <div>
        {album && 
         artist && 
            <AlbumContainer>
                <img src={album.images[1].url}/>
                <div>
                    <h1>{album.name}</h1>
                    <AlbumInfo>
                        <h3>{artist}</h3>
                        <h3>{album.total_tracks} faixas</h3>
                        <h3><BiTimeFive/> {convertAlbumTime(sum_time)}</h3>
                    </AlbumInfo>
                </div>
            </AlbumContainer>
        }
        <div>
        {track && album && track.map( el => 
             <TrackContainer key={el.id}>
             <MusicImage src={album.images[2].url}/>
             <InfoContainer>
             <MusicName>{el.name}</MusicName>
             <div style={{display: 'flex',alignItems: 'center','gap': '10px','padding': 0}}>
                 <TrackInfo>{el.artists[0].name}</TrackInfo>
                 <Circle></Circle>
                 <TrackInfo>{convertMusicTime(el.duration_ms)}</TrackInfo>
             </div>
             </InfoContainer>
         </TrackContainer>
         )}
        </div>
    </div>
  )
}

export default Album