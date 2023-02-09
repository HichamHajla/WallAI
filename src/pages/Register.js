import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from "../assets/logo.jpg"
import axios from 'axios'


const Register = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [image, setImage] = useState(null)
    const [error, setError] = useState(null);

    let navigate = useNavigate()

    const createUser = (e) => {
      e.preventDefault()
  
      const newUser = new FormData() // creates new object with name,email, password
      newUser.append('username', username)
      newUser.append('first_name', firstName)
      newUser.append('last_name', lastName)
      newUser.append('email', email)
      newUser.append('password', password)
      // newUser.append('image', image)
    
    const register = abc => {
        return axios.post('https://wall-ai.fly.dev/auth/register', newUser, {
          headers : {
            'content-type' : 'multipart/form-data'
          }
        })
        .then(res => navigate('/login'))
        
        .catch(err => setError("Email already used. Please log in or register with an other email."))
    }
    register()
    }

  return (
    <>
    <div  className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
    <Link to="/" className="font-inter front-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Back</Link>
    <Link to="/login" className="font-inter front-medium bg-green-600 text-white px-4 py-2 rounded-md">Login</Link>
    </div>
    <section className="max-w-7xl mx-auto mt-40 ">
      <div>
        <h1 className="font-extrabold text-[#222328] text-center text-[32px]">Please Register</h1>
      </div>
      <div className="mt-16">
      <form noValidate onSubmit={createUser}>
      <label>
      <div>
       <h2>Choose a Username :</h2>
       <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
        type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
       </div>
       <div>
       <h2 className='mt-3'>First Name :</h2>
       <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
        type="text" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
       </div>
       <div>
       <h2 className='mt-3'>Last Name :</h2>
       <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
        type="text" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
       </div>
       <div>
       <h2 className='mt-3'>Email :</h2>
       <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3' 
       type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
       </div>
       <div>
       <h2 className='mt-3'>Password :</h2>
       <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
        type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
       </div>
       {/* <div>
       <h2 className='mt-3'>Choose a profile picture : <span className="text-[#666e75] text-[12px]">(Optionnal)</span></h2>
       <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
        type="file" onChange={(e) => setImage(e.target.files[0])}/>
       </div> */}
       <div className='text-center'>
       <button className="mt-4 text-white bg-[#6469ff] font-medium rounded-md text-xl w-full sm:w-auto px-5 py-2.5 text-center"
        type="submit">Register</button>
       </div>
     </label>
     
      </form>
      {error && <div className='mt-8 font-bold text-center' style={{ color: "red" }}>{error}</div>}
      </div>
    </section>
    <footer className="w-full flex justify-between items-center mt-64 sm:px-8 px-4 py-4 border-t border-t-[#e6ebf4]">
        <img src={logo} alt="logo" className="w-28 object-contain"/>
        <h3> © Wall AI 2023 </h3>
        <h2 className='font-bold max-sm:hidden'>Created By :<br/> <span className='font-bold text-[#6449ff] text-xl'>Hicham HAJLA<br/> & Ludovic LEVEQUE</span></h2>
      </footer>
      </>
  )
}

export default Register