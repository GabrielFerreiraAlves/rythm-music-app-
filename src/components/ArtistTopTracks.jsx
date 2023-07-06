import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const DivContainer = styled.div`
  height: 100%;
  width: 50%;
  overflow-x: hidden;
  overflow-y: auto;
  @media(max-width: 800px){
    width: 100%;
    height: auto;
    overflow-y: none;
    overflow-x: hidden;
    margin-top: 15px !important;
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
const Title = styled.h1`
  color: #fff;
  margin-left: 10px !important;
`
const Circle = styled.div`
  width: 6px;
  height: 6px;
  background-color: #474747;
  border-radius: 50%;
`
const ContainerTrackInfos = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 !important;
  @media(max-width: 500px){
    p:nth-child(1){
      width: 60vw;
      white-space: nowrap;
      overflow-x: hidden;
    }
  }
`

const ArtistTopTracks = ({id}) => {
    const [data,setData] = useState(null)
    const [country,setCountry] = useState('')
    const [checkUserTrack,setCheckUserTrack] = useState([])

    const token = localStorage.getItem('accessToken')
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    useEffect(() => {
        const url = 'https://api.spotify.com/v1/me'
      fetch(url,headers)
      .then(res => res.json())
      .then(data => {
        setCountry(data.country)
      })
    },[])
    
    useEffect(() => {
      const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=${country}`
      fetch(url,headers)
      .then(res => res.json())
      .then(data => {
        setData(data.tracks)
      })
    },[id,country])

    function convert(time_ms){
      const minutes_duration = time_ms/60000
      const minutes = Math.floor(time_ms/60000)
      const seconds_rest = time_ms%60000
      const seconds = Math.floor(seconds_rest/1000)
      return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`
    }

  return (
    <DivContainer>
    <Title>Mais Tocadas</Title>
        {data && data.map(el => (
          <TrackContainer key={el.id}>
              <MusicImage src={el.album.images[2].url} alt="" />
              <InfoContainer>
                <MusicName>{el.name}</MusicName>
                <ContainerTrackInfos>
                  <TrackInfo>{el.album.name}</TrackInfo>
                  <Circle></Circle>
                  <TrackInfo>{convert(el.duration_ms)}</TrackInfo>
                </ContainerTrackInfos>
              </InfoContainer>
          </TrackContainer>
        ))}
    </DivContainer>
  )
}

export default ArtistTopTracks