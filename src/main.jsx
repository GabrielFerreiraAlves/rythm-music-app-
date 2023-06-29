import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Artist from './pages/Artist'
import Album from './pages/Album'
import Search from './pages/Search'
import Playlist from './pages/Playlist'
import UserProfile from './pages/UserProfile'
import UserArtists from './pages/UserArtists'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route element={<App/>}>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/artist/:id' element={<Artist/>}/>
            <Route path='/album/:id' element={<Album/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/playlist/:id' element={<Playlist/>}/>
            <Route path='/user' element={<UserProfile/>}/>
            <Route path='/user/artists' element={<UserArtists/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
