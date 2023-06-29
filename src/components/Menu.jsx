import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AiOutlineMenu} from 'react-icons/ai'
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

  &:hover,&:active,&:focus{
    background-color: transparent !important;
  }
`
const StyledHeader = styled(Offcanvas.Header)`
  button{
    background-color: transparent;
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    outline: none !important;
    border: none;
    font-size: 30px;
  }
  button:hover,button:active,button:focus{
    background-color: transparent !important;
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

      <Offcanvas show={show} onHide={handleClose}>
        <StyledHeader closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </StyledHeader>
        <Offcanvas.Body>
         <Nav.Link as={Link} to='/home'>Home</Nav.Link>
         <Nav.Link as={Link} to='/search'>Buscar</Nav.Link>
         <Nav.Link as={Link} to='/user'>Minha conta</Nav.Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Menu