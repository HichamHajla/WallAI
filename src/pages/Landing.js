import React from 'react'
import logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto text-center ">
        <div className="flex flex-col mt-40">
          <h1 className='font-extrabold text-[#222328] text-[60px]'>Welcome to the</h1>
          <img className="mt-16 m-auto text-center" style={{width:"700px"}} src={logo} alt="logo"/>
        </div>
        <div className="flex flex-col items-center mt-12 mb-32">
            <Link to="/login" className="mt-16 text-white bg-[#6469ff] font-medium rounded-md text-xl h-14 w-80 px-5 py-3.5 text-center">
                Log In
            </Link>
            <Link to="/register" className="mt-12 text-white bg-green-600 font-medium rounded-md text-xl h-14 w-80 px-5 py-3.5 text-center">
                Create a new account
            </Link>
        </div>
      </section>
      <footer className="w-full flex justify-between items-center mt-16 sm:px-8 px-4 py-4 border-t border-t-[#e6ebf4]">
        <img src={logo} alt="logo" className="w-28 object-contain"/>
        <h3> © Wall AI 2023 </h3>
        <h2 className='font-bold max-sm:hidden'>Created By :<br/> <span className='font-bold text-[#6449ff] text-xl'>Hicham HAJLA<br/> & Ludovic LEVEQUE</span></h2>
      </footer>
    </>
  )
}

export default Landing