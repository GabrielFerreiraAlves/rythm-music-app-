import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AiOutlineMenu,AiFillHome} from 'react-icons/ai'
import {FiSearch} from 'react-icons/fi'
import {BsPersonCircle} from 'react-icons/bs'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const StyledButton = styled(Button)`
  background-color: transparent;
  padding: 0 !important;
  margin: 0 !important;
  box-shadow: none;
  outline: none;
  border: none;
  font-size: 30px;
  transform: translateY(-1px);

  &:hover,&:active,&:focus{
    background-color: transparent !important;
  }
`
const StyledHeader = styled(Offcanvas.Header)`
  button{
    background-color: transparent;
    color: #470050;
    padding: 0 !important;
    margin: 5px 5px 0px 0px !important;
    box-shadow: none !important;
    outline: none !important;
    border: none;
    font-size: 23px;
  }
  button:hover,button:active,button:focus{
    background-color: transparent !important;
  }
`
const StyledOffCanvas = styled(Offcanvas)`
  background-color: #2b2b2b;
`
const StyledBody = styled(Offcanvas.Body)`
  margin-top: 15px !important;
  a{
    color: #fff;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px 5px !important;
    font-size: 24px;
  }
`

const Menu = () => {
  const [show,setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <StyledButton variant="primary" onClick={handleShow}>
        <AiOutlineMenu/>
      </StyledButton>

      <StyledOffCanvas show={show} onHide={handleClose}>
        <StyledHeader closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </StyledHeader>
        <StyledBody>
         <Nav.Link as={Link} to='/home'><AiFillHome/> Home</Nav.Link>
         <Nav.Link as={Link} to='/search'><FiSearch/> Buscar</Nav.Link>
         <Nav.Link as={Link} to='/user'><BsPersonCircle/> Minha conta</Nav.Link>
        </StyledBody>
      </StyledOffCanvas>
    </>
  )
}

export default Menu