import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { API_BASE_URL } from '../config';


const Manager = () => {
  const [loading, setloading] = useState("");
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [MyPasswords, setMyPasswords] = useState("");
  // const [passwordArray, setpasswordArray] = useState([])


  const CONFIG_OBJ = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }

  const savePassword = async () => {
    if (form.site === '') {
      toast.error("Please enter site name", {
        position: "top-right"
      });
    }else if (form.username === '') {
      toast.error("Please enter site username", {
        position: "top-right"
      });
    }else if (form.password === '') {
      toast.error("Please enter the password", {
        position: "top-right"
      });
    } else {
      setloading(true);
      //add validation
      const request = { site: form.site, username:form.username, password:form.password };
      //write API call for create post request
      await axios.post(`${API_BASE_URL}/`, request, CONFIG_OBJ)
        .then((response) => {
          if (response.status === 201) {
            setloading(false);
            getPasswords();
            toast.success("Password saved Successfully!", {
              position: "top-right"
            });
          }
          setform({ site: "", username: "", password: "" });
        })
        .catch((err) => {
          setloading(false);
          console.log(err);
          toast.error(err.response.data.Error, {
            position: "top-right"
          });
        });

    }
  }

  const getPasswords = async () => {
    await axios.get(`${API_BASE_URL}/`, CONFIG_OBJ)
        .then((response) => {
            if (response.status === 200) {
                console.log(response);
                setMyPasswords(response.data.Passwords);
            }
        })
        .catch((err) => {
            toast.error(err.response.data.Error, {
                position: "top-right"
            });
        });
}



  useEffect(() => {

    // let passwords = localStorage.getItem("passwords");
    // if (passwords) {
    //   setpasswordArray(JSON.parse(passwords))
    // }
    getPasswords();
  }, [])


  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("/crossEye.png")) {
      ref.current.src = "/eye.png"
      passwordRef.current.type = "text"
    }
    else {
      passwordRef.current.type = "password"
      ref.current.src = "/crossEye.png"
    }
  }
  // const savePassword = () => {
  //   setpasswordArray([...passwordArray, {...form, id:uuidv4()}])
  //   localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]));
  //   console.log(passwordArray);
  //   setform({ site: "", username: "", password: "" });
  //   toast('Password Saved successfully', {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  //   // navigator.clipboard.writeText(item);
  // }
  const deletePassword = async(id) => {
    console.log("deleting password using id: ",id);
    let cnfrm= confirm("do you really wan to delete password")
    if(cnfrm){
      await axios.delete(`${API_BASE_URL}/${id}`, CONFIG_OBJ)
      .then((response) => {
        if (response.status === 200) {
          getPasswords();
          toast.success("Deleted Successfully!", {
            position: "top-right"
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.Error, {
          position: "top-right"
        });
      });
      // navigator.clipboard.writeText(item);
    }
    
    
  }
  const editPassword = async(item) => {
    console.log("editing password using id: ",item._id);
    setform({site: item.site, username: item.username, password: item.password});
    // setpasswordArray((passwordArray.filter(item=>item.id!==id)));
    // console.log(passwordArray);
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (item) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(item);
  }


  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      /> */}
      {/* <ToastContainer /> */}


      <div className="px-2 md:px-0 md:mycontainer min-h-[85vh]">
        <h1 className='text-4xl font-bold text-center'> <span className='text-purple-800'>&lt;Vik</span>
          Crypt
          <span className='text-purple-800'>/&gt;</span>
        </h1>
        <p className='text-lg text-purple-950 text-center'>Your Own pasword Manager</p>

        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input  value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-purple-500 w-full py-1 px-4' type="text" name='site' id='siteName' />

          <div className='flex flex-col md:flex-row w-full gap-4 justify-between relative'>

            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-purple-500 w-full py-1 px-4' type="text" name='username' id='userName' />

            <input  ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-purple-500 w-full py-1 px-4' type="password" name='password' id='pass' />
            <span className='absolute right-[3px] top-[3px] cursor-pointer' onClick={showPassword}><img ref={ref} className=' py-1 px-1' width={26} src="/eye.png" alt="" /></span>

          </div>

          <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-purple-500 rounded-full hover:bg-purple-300 px-8 py-2 w-fit border-2 border-purple-800'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Add Password
            {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div> : ""}
          </button>


        </div>
        <div className="passwords">
          <h2 className='font-bold text-3xl py-2'>Your Passwords</h2>

          {MyPasswords.length === 0 && <div>no passwords to show</div>}

          {MyPasswords.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-purple-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Passwords</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-purple-100'>
              {MyPasswords.map((item, index) => {
                return <tr key={index}>

                  <td className='py-2 text-center first-letter border border-white'>
                    <div className=' flex flex-row items-center justify-center gap-4' onClick={() => { copyText(item.site) }}>

                      <span><a href={item.site} target='_blank'>{item.site}</a></span>
                      <div className='size-7'>
                        <img className='rounded-xl cursor-pointer' src="copy.gif" alt="copy" width={"40px"} height={"40px"} />
                      </div>
                    </div>
                  </td>


                  <td className='py-2 text-center first-letter border border-white'>
                    <div className=' flex items-center justify-center gap-4' onClick={() => { copyText(item.username) }}>
                      <span>{item.username}</span>
                      <div className='size-7'>
                        <img className='rounded-xl cursor-pointer' src="copy.gif" alt="copy" width={"40px"} height={"40px"} />
                      </div>
                    </div>
                  </td>


                  <td className='py-2 text-center  first-letter border border-white '>
                    <div className=' flex items-center justify-center gap-4' onClick={() => { copyText(item.password) }}>
                      <span>{item.password}</span>
                      <div className='size-7'>
                        <img className='rounded-xl cursor-pointer' src="copy.gif" alt="copy" width={"40px"} height={"40px"} />
                      </div>
                    </div>
                  </td>


                  <td className='py-2 text-center  first-letter border border-white '>

                    <span className='cursor-pointer mx-2' onClick={()=>{deletePassword(item._id)}}>
                      <lord-icon
                        src="https://cdn.lordicon.com/drxwpfop.json"
                        trigger="hover"
                        colors="primary:#121331,secondary:#8930e8"
                        style={{ "width": "28px", "height": "28px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-2' onClick={()=>{editPassword(item)}}>
                      <lord-icon
                        src="https://cdn.lordicon.com/wuvorxbv.json"
                        trigger="hover"
                        colors="primary:#121331,secondary:#8930e8"
                        style={{ "width": "28px", "height": "28px" }}>
                      </lord-icon>
                    </span>
                  </td>




                </tr>
              })}


            </tbody>
          </table>}
        </div>
      </div>

    <ToastContainer/>
    </>
  )
}

export default Manager
