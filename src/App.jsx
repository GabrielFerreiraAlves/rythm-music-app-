import { useState } from 'react'
import {Outlet,useLocation,Link} from 'react-router-dom'
import Menu from './components/Menu'
import {Navbar,Container} from 'react-bootstrap'
import styled from 'styled-components'
import {BsFillPlayCircleFill} from 'react-icons/bs'
import logo from './assets/logo.png'

const NavbarStyled = styled(Navbar)`
  background-color: #470050;
  height: 65px !important;
  justify-content: center;
`
const LinkStyled = styled(Link)`
  color: #fff;
  font-size: 20px;
`

function App() {
  const route = useLocation()
  const verifyRoute = route.pathname === '/'

 
  return (
    <div style={{backgroundColor: '#000000',minHeight: '100vh'}}>
      <NavbarStyled>
        <Container>
        <LinkStyled to="/">Rythm<span>.com  <img src={logo} alt="" style={{width: '25px',filter: 'invert(100%)'}}/></span></LinkStyled>
        {!verifyRoute && <Menu/>}
        </Container>
      </NavbarStyled>
      <Outlet/>
    </div>
  )
}

export default App

