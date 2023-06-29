import React from 'react'
import styled from 'styled-components'

const GreetingText = styled.h1`
  color: #fff;
  font-size: 26px;
  margin: 10px !important;
`

const Greeting = () => {
    const dateNow = new Date()
    const hour = dateNow.getHours()

    const setGreeting = () => {
      if(hour >= 0 && hour < 12){
        return 'Bom dia!'
      }else if(hour >= 12 && hour < 19){
        return 'Boa tarde!'
      }else if(hour >= 19 && hour < 24){
        return 'Boa noite!'
      }
    }
   
  return (
    <div>
      <GreetingText>{setGreeting()}</GreetingText>
    </div>
  )
}

export default Greeting