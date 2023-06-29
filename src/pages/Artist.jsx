import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import {useParams} from 'react-router-dom'
import ArtistInfo from '../components/ArtistInfo'
import ArtistTopTracks from '../components/ArtistTopTracks'
import RelatedArtists from '../components/RelatedArtists'
import ScrollToTop from '../components/ScrollToTop'
import ArtistAlbums from '../components/ArtistAlbums'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    height: 70vh;
    justify-content: center;
    @media(max-width: 900px){
        display: block;
        height: auto;
    }
`

const Artist = () => {
    const {id} = useParams()
    const [artistName,setArtistName] = useState("")
    const [followers,setFollowers] = useState("")
    const [imageArtist,setImageArtist] = useState("")

    const token = Cookies.get('accessToken')
    const headers = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        const url = `https://api.spotify.com/v1/artists/${id}`
        fetch(url,headers)
        .then(res => res.json())
        .then(data => {
            if(data && data.followers && data.images){
                setArtistName(data.name)
                setFollowers(data.followers.total)
                setImageArtist(data.images[1].url)
            }
        })
    },[id])

  return (
    <div>
        <ScrollToTop/>
        <ArtistInfo id={id} name={artistName} followers={followers} image={imageArtist}/> 
        <Container>
            <ArtistAlbums id={id}/>
            <ArtistTopTracks id={id}/>
        </Container>

        <RelatedArtists id={id}/>
    </div>
  )
}

export default Artist