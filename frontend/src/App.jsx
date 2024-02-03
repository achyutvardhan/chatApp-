import {BrowserRouter, Routes, Route} from "react-router-dom"
import Chatroom from "./Pages/Chatroom"
import Nopage from "./Pages/Nopage"
import Signin from "./Pages/Signin"
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Signin />}/>
          <Route  path="chatroom" element={ <Chatroom/>}/>
          <Route path="*" element={<Nopage />} />
  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
