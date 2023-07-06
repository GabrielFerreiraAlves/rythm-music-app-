import {useState,useEffect} from 'react'
import styled from 'styled-components'
import UserInfo from '../components/UserInfo'
import CardUserTopArtist from '../components/CardUserTopArtist'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import {Link} from 'react-router-dom'
import {IoIosArrowForward} from 'react-icons/io'

const UserContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media(max-width: 700px){
    display: block;
  }
`
const Title = styled.h1`
    color: #fff;
    font-size: 26px;
    margin: 10px !important;
`
const Button = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px !important;
  margin-top: 10px !important;
  width: 100%;
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  transition: background-color .2s linear;
  &:hover{
    background-color: #131212;
    color: #fff;
  }
`
const SaveUserItems = styled.div`
  width: 50%;

  @media(max-width: 700px){
    width: 100%;
  }
`

const UserProfile = () => {
    const [userData,setUserData] = useState([])
    const [topArtistsUser,setTopArtistsUser] = useState([])

    const token = localStorage.getItem('accessToken')
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    useEffect(() => {
        const url = "https://api.spotify.com/v1/me"
        fetch(url,headers)
        .then(res => res.json())
        .then(data => {
          setUserData(data)
        })
    },[])

    useEffect(() => {
      const url = 'https://api.spotify.com/v1/me/top/artists?limit=5'
      fetch(url,headers)
        .then(res => res.json())
        .then(data => {
          setTopArtistsUser(data.items)
        })
    },[])

    const breakpoints = {
      100: {
        slidesPerView: 2.3
      },
      400: {
        slidesPerView: 2.6
      },
      550: {
        slidesPerView: 2.8
      },
      700: {
        slidesPerView: 3
      },
      900: {
        slidesPerView: 3.4
      },
      1100: {
        slidesPerView: 3.8
      }
    }
  return (
    <UserContainer>
      {userData && 
        <UserInfo 
        image={userData.images}
        name={userData.display_name}
        email={userData.email}
        country={userData.country}
        followers={userData.followers}
        accountType={userData.product}
        />
        }
      <SaveUserItems>
          <Title>Mais tocados</Title>
          <Swiper modules={[Navigation]} navigation={true} slidesPerView='3.8' breakpoints={breakpoints}>
            {topArtistsUser && topArtistsUser.map(el => (
              <SwiperSlide key={el.id}>
                <CardUserTopArtist id={el.id} name={el.name} image={el.images}/>
              </SwiperSlide>
            ))}
          </Swiper>
          <div>
            <Button to='/user/artists'><span>Meus Artistas</span> <IoIosArrowForward/></Button>
            <Button to={`user/${userData.id}/playlists`}><span>Minhas Playlists</span> <IoIosArrowForward/></Button>
          </div>
      </SaveUserItems>  
    </UserContainer>
  )
}

export default UserProfile