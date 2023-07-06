import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const ArtistContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0px 0px 10px!important;
  img{
    width: 110px;
    height: 110px;
    object-fit: cover;
    border-radius: 50%
  }
  p{
    color: #fff;
    font-size: 18px;
    font-weight: 500;
  }
`
const Title = styled.h1`
  color: #fff;
  font-size: 26px;
  margin: 10px !important;
`
const ArtistEmpty = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  p{
    color: #fff;
    font-weight: 500;
    font-size: 20px;
  }
`

const UserArtists = () => {
  const [artists,setArtists] = useState([])

  const url = 'https://api.spotify.com/v1/me/following?type=artist' 
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
      setArtists(data.artists.items)
    })
  },[])
// artists.name artists.id artists.images[1].url
  return (
    <div>
      <Title>Meus Artistas</Title>
      {artists.length === 0 && <ArtistEmpty><p>Você não segue nenhum artista</p></ArtistEmpty>}
      {artists && artists.map(el => (
        <Link to={`/artist/${el.id}`}>
          <ArtistContainer>
            <img src={el.images[1].url} alt={'image of '+el.name} />
            <p>{el.name}</p>
          </ArtistContainer>
        </Link>
      ))}
    </div>
  )
}

export default UserArtists