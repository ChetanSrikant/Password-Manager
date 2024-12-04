import React from 'react'
import github from "../assets/github.png"

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="mycontainer flex justify-between items-center py-5 px-4 h-14 ">
        <div className="logo font-bold text-2xl">
        <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>OP/ &gt;</span>          
          </div>
      {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li>
      </ul> */}
      <button className='text-white bg-green-700 my-5 rounded-full flex justify-center items-center ring-white ring-1'>
        <img className='invert p-1 w-10' src={github} alt="logo" />
        <span className='font-bold px-2'>Github</span>
      </button>
      </div>
    </nav>
  )
}

export default Navbar
