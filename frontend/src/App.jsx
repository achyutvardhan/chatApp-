import {BrowserRouter, Routes, Route} from "react-router-dom"
import Chatroom from "./Pages/Chatroom"
import Nopage from "./Pages/Nopage"
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route  path="/chatroom" element={ <Chatroom/>}/>
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
