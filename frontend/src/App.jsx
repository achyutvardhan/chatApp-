import {BrowserRouter, Routes, Route} from "react-router-dom"
import Chatroom from "./Pages/Chatroom"
import Nopage from "./Pages/Nopage"
import Login from "./Pages/Login"
import './App.css'
import Privateroute from "./Pages/Privateroute"
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
           <Route element={<Privateroute/>} >
          <Route  path="/" element={ <Chatroom/>} exact/>
           </Route>
          <Route  path="/login" element={ <Login/>}/>
          <Route path="*" element={<Nopage />} />
  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
