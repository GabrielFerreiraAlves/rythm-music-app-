import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'

const Title = styled.h1`
  color: #fff;
  font-size: 26px;
  margin: 10px !important;
`
const PlaylistEmpty = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  p{
    color: #fff;
    font-weight: 500;
    font-size: 20px;
  }
`
const PlaylistContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0px 0px 10px!important;
  img{
    width: 90px;
    height: 90px;
    object-fit: cover;
  }
  p{
    color: #fff;
    font-size: 18px;
    font-weight: 500;
  }
`

const UserPlaylists = () => {
    const [playlists,setPlaylists] = useState([])
    const {id} = useParams()

    const url = `https://api.spotify.com/v1/users/${id}/playlists`
    const token = localStorage.getItem('accessToken')
    const headers = {
    headers:{
        Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        fetch(url,headers)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setPlaylists(data.items)
        })
      },[])

  return (
    <div>
      <Title>Minhas Playlists</Title>
      {playlists.length === 0 && <ArtistEmpty><p>Você não segue nenhum artista</p></ArtistEmpty>}
      {playlists && playlists.map(el => (
        <Link to={`/playlist/${el.id}`}>
          <PlaylistContainer>
            <img src={el.images[0].url} alt={'image of '+el.name} />
            <p>{el.name}</p>
          </PlaylistContainer>
        </Link>
      ))}
    </div>
  )
}

export default UserPlaylists