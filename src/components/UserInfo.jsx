import React from 'react'
import styled from 'styled-components'

const DivContainer = styled.div`
    margin-top: 40px !important;
    text-align: center;
    h1{
        color: #fff;
        font-size: 40px;
    }
    h3{
        color: #474747;
        font-size: 28px;
        font-weight: 400;
    }
    h4{
      color: #474747;
      font-size: 24px;
      font-weight: 300;
      margin-top: 5px !important;
    }
    @media(max-width: 500px){
      margin-top: 15px !important;
      h4{
        font-size: 20px;
        color: #a0a3a2;
      }
      h1{
        font-size: 28px;
      }
      h3{
        font-size: 22px;
        color: #a0a3a2;
      }
      
    }
`

const UserInfo = ({name,email,country,followers,accountType,image}) => {
  return (
    <DivContainer>
          {image && image[0] && image[0].url && <img src={image[0].url} alt="" />}
          <div>
          <h1>{name}</h1>
          {followers && <h3>{followers.total} seguidores</h3>}
          <h4>Email: {email}</h4>
          <h4>Região: {country}</h4>
          <h4>Tipo de conta: {accountType}</h4>
          </div>
    </DivContainer>
  )
}

export default UserInfo