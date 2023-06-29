import {BsSpotify} from 'react-icons/bs'

const Login = () => {
    const clientId = '3335d724447c40ae8e6ccb9bcba70921' 
    const redirectUrl = 'http://localhost:5173/home'
    const spotifyUrl = 'https://accounts.spotify.com/authorize'
    const name = 'oi'
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
    <div>
      <h1 style={{fontSize: '30px'}}>Descubra novos artistas e músicas para animar seu dia</h1>
      <button onClick={handleClick}>Entrar com Spotify <BsSpotify/></button>
    </div>
  )
}

export default Login