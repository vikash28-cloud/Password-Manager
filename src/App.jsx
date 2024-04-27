import './index.css'
import Navbar from "./components/Navbar"
import Manager from './components/Manager'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return <>
 <BrowserRouter>
 <Navbar/>
      <Routes>
       <Route path='/login' element={<Login />}/>
       <Route path='/' element={<Manager />}/>
       <Route path='/signup' element={<Signup />}/>
      
      </Routes>
      <Footer/>
    </BrowserRouter>
 
  </>
}

export default App
