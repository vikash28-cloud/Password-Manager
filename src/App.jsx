import './index.css'
import Navbar from "./components/Navbar"
import Manager from './components/Manager'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
function App() {
  function DynamicRouting() {
    const user = useSelector(state => state.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
      const UserData = JSON.parse(localStorage.getItem(user));
      if (UserData){
        dispatch({type:"LOGIN_SUCCESS",payload:UserData});
        navigate('/')
      }else{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({type: 'LOGIN_ERROR'});
        navigate('/login');
      }
    },[]);
    
    return(
      <Routes>
       <Route path='/login' element={<Login />}/>
       <Route path='/' element={<Manager />}/>
       <Route path='/signup' element={<Signup />}/>
      
      </Routes>
    )
  }
  return <>
 <BrowserRouter>
 <Navbar/>
      <DynamicRouting/>
      <Footer/>
    </BrowserRouter>
 
  </>
}

export default App
