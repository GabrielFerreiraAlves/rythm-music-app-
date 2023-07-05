import styled from 'styled-components'
import {useEffect,useState} from 'react'
import {BsPatchCheck} from 'react-icons/bs'

const ImageArtist = styled.img`
    border-radius: 50%;
    width: 250px;
    height: 250px;
    object-fit: cover;
    display: block;
    margin: 10px auto !important;
`
const NameArtist = styled.h1`
  text-align: center;
  color: #fff;
`
const Followers = styled.p`
  color: #fff;
  font-size: 17px;
  text-align: center;
  margin: 10px 0px !important;
`
const Button = styled.button`
  background-color: #470050;
  padding: 5px 20px !important;
  border-radius: 30px;
  color: #fff;
  border: none;
`
const FollowerContainer = styled.div`
  margin: 10px auto !important;
  gap: 10px;
`
const ArtistInfo = ({image,name,followers,id}) => {
    const [following,setFollowing] = useState(false)
    const [bool,setBool] = useState()
    
    const token = localStorage.getItem('accessToken')

    useEffect(() => {
      const url = `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`
      const headers = {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
      fetch(url,headers)
      .then(res => res.json()
      .then(data => {
        setBool(data[0])
      }))
    },[id])

    function follow(value_id){
      const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${value_id}`
      const headersFollow = {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
      fetch(url,headersFollow)
      .then(res => res.ok ? console.log('ok') : console.log('erro'))
      .then(() => setBool(true))
    }
  
    function unfollow(value_id){
      const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${value_id}`
      const headersFollow = {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
      fetch(url,headersFollow)
      .then(res => res.ok ? console.log('ok') : console.log('erro'))
      .then(() => setBool(false))
    }

    return (
      <div>
        <ImageArtist src={image} alt="" />
        <div className="container-info-artist">
          <NameArtist>{name}</NameArtist>
          <FollowerContainer className='d-flex justify-content-center'>
          <Followers>{followers} seguidores</Followers>
          {bool === true ? (<Button onClick={() => unfollow(id)}>Seguindo <BsPatchCheck/></Button>) : (<Button onClick={() => follow(id)}>Seguir</Button>)}
          </FollowerContainer>
        </div>
    </div>
  )
}

export default ArtistInfo