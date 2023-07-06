import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'

const UserPlaylists = () => {
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
        })
      },[])

  return (
    <div>UserPlaylists</div>
  )
}

export default UserPlaylists