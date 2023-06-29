import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const ArtistImage = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    margin: 0 auto !important;
`
const ArtistContainer = styled.div`
    margin-top: 10px !important;
    p{
        font-size: 19px;
        color: #fff;
        font-weight: 500;
        text-align: center;
    }
    @media(max-width: 360px){
      p{
        font-size: 16px;
      }
    }
`
const CardUserTopArtist = ({name,image,id}) => {
  return (
    <ArtistContainer>
    <Link to={`/artist/${id}`}>
      {image && image[0] && image[0].url && <ArtistImage src={image[0].url}/>}
      <p>{name}</p>
    </Link>
    </ArtistContainer>
  )
}

export default CardUserTopArtist