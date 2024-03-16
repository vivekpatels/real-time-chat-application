import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Homepage from './pages/Homepage'
import Chatpage from './pages/Chatpage'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/chats" element={<Chatpage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App