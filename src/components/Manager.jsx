import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {

    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }

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
  const savePassword = () => {
    setpasswordArray([...passwordArray, {...form, id:uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]));
    console.log(passwordArray);
    setform({ site: "", username: "", password: "" });
    toast('Password Saved successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // navigator.clipboard.writeText(item);
  }
  const deletePassword = (id) => {
    console.log("deleting password using id: ",id);
    let cnfrm= confirm("do you really wan to delete password")
    if(cnfrm){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      toast('Password Deleted successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // navigator.clipboard.writeText(item);
    }
    
    
  }
  const editPassword = (id) => {
    console.log("editing password using id: ",id);
    setform(passwordArray.filter(item=>item.id===id)[0])
    setpasswordArray((passwordArray.filter(item=>item.id!==id)));
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
          </button>


        </div>
        <div className="passwords">
          <h2 className='font-bold text-3xl py-2'>Your Passwords</h2>

          {passwordArray.length === 0 && <div>no passwords to show</div>}

          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-purple-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Passwords</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-purple-100'>
              {passwordArray.map((item, index) => {
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

                    <span className='cursor-pointer mx-2' onClick={()=>{deletePassword(item.id)}}>
                      <lord-icon
                        src="https://cdn.lordicon.com/drxwpfop.json"
                        trigger="hover"
                        colors="primary:#121331,secondary:#8930e8"
                        style={{ "width": "28px", "height": "28px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-2' onClick={()=>{editPassword(item.id)}}>
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
