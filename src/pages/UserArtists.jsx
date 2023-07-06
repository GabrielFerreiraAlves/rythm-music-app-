import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'

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
      console.log(data)
      setArtists(data.artists.items)
    })
  },[])
// artists.name artists.id artists.images[1].url
  return (
    <div>
      {artists && artists.map(el => (
        <Link to={`/artist/${el.id}`}>
          <img src={el.images[1].url} alt="" />
          <p>{el.name}</p>
        </Link>
      ))}
    </div>
  )
}

export default UserArtists