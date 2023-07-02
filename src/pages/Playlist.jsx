import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import {BiTimeFive} from 'react-icons/bi'
import FollowButtonPlaylist from '../components/FollowButtonPlaylist'

const AlbumContainer = styled.div`
    margin-top: 20px !important;
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
        width: 250px;
        height: 250px;
        object-fit: cover;
    }
    @media(max-width: 500px){
      display: block;
      text-align: center;
      div h1{
        margin-top: 20px !important;
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
    color: #a0a3a2;
  }
`
const TrackInfo = styled.p`
  color: #474747;
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

const Playlist = () => {
    const [playlistData,setPlaylistData] = useState([])
    const [tracks,setTracks] = useState([])

    const {id} = useParams()

    const token = Cookies.get('accessToken')
    const headers = {
        headers: {
        Authorization: `Bearer ${token}`
        }
    }
    const url = `https://api.spotify.com/v1/playlists/${id}`

    useEffect(() => {
        fetch(url,headers)
        .then(res => res.json())
        .then(data => {
            setPlaylistData(data)
            setTracks(data.tracks.items)
        })
    },[id])

    const total_time = tracks.map(el => el.track.duration_ms)
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
        {playlistData && tracks &&
            <AlbumContainer>
                {playlistData.images && playlistData.images[0] && playlistData.images[0].url && <img src={playlistData.images[0].url} alt="" /> }
                <div>
                <h1>{playlistData.name}</h1>
                <AlbumInfo>
                  <FollowButtonPlaylist id={id}/>
                <h3>{tracks.length} faixas</h3>
                <h3><BiTimeFive/> {convertAlbumTime(sum_time)}</h3>
                </AlbumInfo>
                </div>
            </AlbumContainer>

}
    {tracks && tracks.map(el => (
        <TrackContainer key={el.track.id}>
            <MusicImage src={el.track.album.images[2].url}/>
            <InfoContainer>
            <MusicName>{el.track.name}</MusicName>
            <div style={{display: 'flex',alignItems: 'center','gap': '10px','padding': 0}}>
                <TrackInfo>{el.track.artists[0].name}</TrackInfo>
                <Circle></Circle>
                <TrackInfo>{convertMusicTime(el.track.duration_ms)}</TrackInfo>
            </div>
            </InfoContainer>
        </TrackContainer>
    ))}
        
    </div>
  )
}

export default Playlist