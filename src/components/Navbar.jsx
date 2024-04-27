import React from 'react'

const Navbar = () => {

  return (
    <nav className="bg-purple-200">
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-5 ">


        <div className="logo font-bold text-black text-2xl">
          <span className='text-purple-800'>&lt;Vik</span>
        Crypt
          <span className='text-purple-800'>/&gt;</span>
        </div>
        <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">home</a>
            <a className='hover:font-bold' href="/login">Login</a>
            <a className='hover:font-bold' href="/signup">SignUp</a>
          </li>
        </ul>
        <a href="https://github.com/vikash28-cloud" target='_blank'>
        <button className='text-white hover:bg-purple-500 bg-purple-600 my-5 rounded-md flex justify-between items-center'>
          <img className='invert p-1 w-10' src="/github.svg" alt="github-logo" />
          <span className='font-bold px-2'>GitHub</span>
        </button>

        </a>
        
      </div>
    </nav>

  )
}

export default Navbar