import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import './App.css'
import Home from "./components/home"
import Adducer from "./components/Adducer"
import Userlisting from "./components/Userlisting"
import Updateuser from "./components/Updateuser"
import { ToastContainer } from "react-toastify"
function App() {

  return (
    <>
      <div>
        <BrowserRouter>
        <div className="header">
          <Link to={"/"}>Home</Link>
          <Link to={"/user"}>User</Link>
          <Link></Link>

        </div>
        <Routes>

          <Route path="/" element={<Home></Home>}> </Route>
          <Route path="/user" element={<Userlisting></Userlisting>}></Route>
          <Route path="/user/add" element={<Adducer></Adducer>}></Route>
          <Route path="/user/edit:code" element={<Updateuser></Updateuser>}></Route>
         

        </Routes>
        </BrowserRouter>
        <ToastContainer></ToastContainer>
      </div>
    </>
  )
}

export default App
