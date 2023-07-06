import {useEffect,useState} from 'react'

const UserArtists = () => {
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
    .then(data => console.log(data))
  },[])

  return (
    <div>UserArtists</div>
  )
}

export default UserArtists