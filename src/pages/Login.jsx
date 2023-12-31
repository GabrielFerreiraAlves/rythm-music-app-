import {BsSpotify} from 'react-icons/bs'
import styled from 'styled-components'

const Div = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Description = styled.h1`
  font-size: 30px;
  text-align: center;
  color: #fff;
  @media(max-width: 450px){
    font-size: 24px;
  }
`
const Button = styled.button`
  display: block;
  background-color: #470050;
  font-size: 18px;
  padding: 5px 20px !important;
  margin: 10px auto !important;
  border-radius: 30px;
  color: #fff;
  border: none;
`

const Login = () => {
    const clientId = '3335d724447c40ae8e6ccb9bcba70921' 
    const redirectUrl = 'https://rythmmusic.netlify.app/home'
    const spotifyUrl = 'https://accounts.spotify.com/authorize'
    const scope = [
        'user-read-private',
        'user-read-email',
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
        'user-follow-read',
        'user-follow-modify'
      ]
      
    const handleClick = () => {
        window.location.href = `${spotifyUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`
    }

  return (
    <Div>
      <div>
        <Description>Descubra novos artistas e músicas para animar seu dia</Description>
        <Button onClick={handleClick}>Entrar com Spotify <BsSpotify/></Button>
      </div>
    </Div>
  )
}

export default Login
