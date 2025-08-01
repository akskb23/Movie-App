// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import WatchList from './components/WatchList'
import { Routes, Route } from 'react-router-dom'
import WatchListContextWrapper from './context/WatchListContext'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    
      <NavBar />
      <WatchListContextWrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/watchlist' element={<WatchList />} />
        </Routes>
      </WatchListContextWrapper>

    </>
  )
}

export default App
