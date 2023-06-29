import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import styled from 'styled-components'

const Button = styled.button`
    background-color: transparent;
    border: none;
    color: #470050;
    font-size: 28px;
    transform: translateY(-3px)
`
const FillHeart = styled(AiFillHeart)`
    @media(max-width: 500px){
      transform: scale(135%)
    }
`
const OutlineHeart = styled(AiOutlineHeart)`
    @media(max-width: 500px){
      transform: scale(135%)
    }
`

const FollowButtonPlaylist = ({id}) => {
    const [userId,setUserId] = useState("")
    const [isFollowing,setIsFollowing] = useState(false)

    const token = Cookies.get('accessToken')
    const headers = {
        headers: {
        Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        const url = 'https://api.spotify.com/v1/me'
        fetch(url,headers).then(res => res.json()).then(data => setUserId(data.id))
    },[])

    useEffect(() => {
        if(userId !== ""){
        const url = `https://api.spotify.com/v1/playlists/${id}/followers/contains?ids=${userId}`
        fetch(url,headers).then(res => res.json()).then(data => setIsFollowing(data[0]))
        }
    },[id,userId])

    // useEffect(() => {console.log(isFollowing)},[isFollowing])
    
    const follow = () => {
        const url = `https://api.spotify.com/v1/playlists/${id}/followers`
        const headersFollow = {
        method: 'PUT',
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
      fetch(url,headersFollow)
      .then(res => res.ok ? console.log('ok') : console.log('erro'))
      .then(() => setIsFollowing(true))
    }
    const unfollow = () => {
        const url = `https://api.spotify.com/v1/playlists/${id}/followers`
        const headersFollow = {
        method: 'DELETE',
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
      fetch(url,headersFollow)
      .then(res => res.ok ? console.log('ok') : console.log('erro'))
      .then(() => setIsFollowing(false))
    }

  return (
    <div>
        {isFollowing === true ? (<Button onClick={unfollow}><FillHeart/></Button>) : (<Button onClick={follow}><OutlineHeart/></Button>)}
    </div>
  )
}

export default FollowButtonPlaylist