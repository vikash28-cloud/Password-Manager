import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import axios from 'axios';

import {Link, useNavigate } from 'react-router-dom';



import {useDispatch} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setloading] = useState(false);

    const login = (e) => {
        e.preventDefault();
        setloading(true);

        const requestData = { email:email, password }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                if (result.status===200) {
                    setloading(false);

                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem("user", JSON.stringify(result.data.result.user));
                    dispatch({type:'LOGIN_SUCCESS',payload: result.data.result.user});
                    setloading(false);
                    navigate('/');

                    toast('Logged in successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                }
                setemail("");
                setpassword("");
            })
            .catch((err) => {
                setloading(false);

                console.log(err);
                toast.error(err.response.data.Error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            });
    }
    return <>
        <ToastContainer/>
        <form action="/" method='post' onSubmit={(e)=>login(e)}>

            <main class="flex h-screen w-full items-center justify-center px-4 md:px-6">
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
                    <div class="flex flex-col space-y-1.5 p-6">
                        <h3 class="whitespace-nowrap tracking-tight text-2xl font-bold">Welcome back</h3>
                        <p class="text-sm text-muted-foreground">Enter your email and password to access your account.</p>
                    </div>
                    <div class="p-6 space-y-4">
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="email"
                            >
                                Email
                            </label>
                            <input
                                value={email} onChange={(e) => setemail(e.target.value)}
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="email"
                                placeholder="name@example.com"
                                required=""
                                type="email"
                            />
                        </div>
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <label
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="password"
                                >
                                    Password
                                </label>
                                <a class="text-sm underline" href="#">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                value={password} onChange={(e) => setpassword(e.target.value)}
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="password"
                                required=""
                                type="password"
                            />
                        </div>
                    </div>
                    <div class="flex items-center p-6">
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-purple-500 text-white"
                            type="submit"
                        >
                           LogIn
                           {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : ""}
                        </button>
                    </div>
                    <p style={{ fontSize: "14px", paddingLeft:"22px", paddingBottom:"20px" }}>Don't have an account? <Link to='/signup' style={{color:"blue"}}>Signup here</Link></p>
                </div>
            </main>

        </form >

    </>
}

export default Login