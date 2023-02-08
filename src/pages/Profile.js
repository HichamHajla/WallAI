import {useState, useEffect } from 'react'
import logo from "../assets/logo.jpg"
import { Link } from 'react-router-dom'
import FormField from '../components/FormField'
import Loader from '../components/Loader'
import Card from '../components/Card'
import axios from 'axios'



const RenderCards = ({data , title}) => {
    if(data?.length > 0) {
        return (
          data.map((post) => <Card key={post._id} {...post}/>)
        );
      }
        return (
            <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase' >{title}</h2>
        )}

const Profile = () => {
    const [loading, setLoading] = useState(false)
    const [allPosts, setAllPosts] = useState(null)
    const [searchText, setSearchText] = useState("")
    const [searchedResults, setSearchedResults] = useState(null)
    const [searchTimeout, setSearchTimeout] = useState(null)
    const details = JSON.parse(localStorage.getItem('details')) || {};
    const [profile, setProfile] = useState({
      username: '',
      image: null,
      first_name: "",
      last_name: "",
      email: '',
    });

    const fetchPosts = async () => {
        setLoading(true);
        try {
          const details = JSON.parse(localStorage.getItem('details')) || {};
          const response = await fetch(`http://localhost:8080/api/post/user/${details._id}`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
          },
        })
        if(response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
      }
        } catch (error) {
          alert(error)
        } finally {
        setLoading(false)
        }
      }
  
      useEffect(() => {
        fetchPosts()
      }, [])

      const handleSearch = (e) => {
        clearTimeout(searchTimeout);
  
        setSearchText(e.target.value);
    
        setSearchTimeout(
          setTimeout(() => {
            const searchResult = allPosts.filter((item) => 
            item.name.toLowerCase().includes(searchText.toLowerCase()) || 
            item.prompt.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedResults(searchResult);
          }, 500),
        );
      };

      // Handle input changes and update the profile state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle profile picture change and update the profile state
  const handleProfilePictureChange = (event) => {
    setProfile({ ...profile, image: event.target.files[0] });
  };

  // Function to handle the update profile form submit
  const handleUpdateProfile = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', profile.username);
    formData.append('first_name', profile.username);
    formData.append('last_name', profile.last_name);
    formData.append('email', profile.email);
    formData.append('image', profile.image);

    axios
      .put(`http://localhost:8080/api/users/${details._id}`, formData , {
       headers : {
        'content-type' : 'multipart/form-data'
      }})
      .then((response) => {
        console.log(response);
      })
  };

  


  return (
    <>
    <div className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
    <Link to="/home"  className="font-inter front-medium bg-[#6469ff] w-25 text-white px-4 py-2 rounded-md">Back</Link>
    <Link to="/home"><img src={logo} alt="logo" style={{width:"180px"}} className="object-contain sm:w-auto"/></Link>
    <Link to="/create-post" className="font-inter front-medium bg-[#6469ff] w-25 text-white px-4 py-2 rounded-md">Create</Link>
    </div>
    <div className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
    <section className="max-w-7xl mx-auto">
    <h1 className='font-extrabold text-[#222328] text-[32px] text-center mt-2'>Your Personal Wall</h1>
    <div className="grid lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 grid-cols-1 gap-8 '">
    <div>
          <img src={`http://localhost:8080${details.image}`} alt="logo" className="w-40 h-80 rounded-full object-cover sm:w-auto mt-16 container mx-auto"/>
        </div>
        <div className='flex flex-col' >
        <h1 className=' font-extrabold text-[#222328] text-[32px] mt-8'>{details.username}</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>Bio</p>
        <h2 className='font-extrabold text-[#222328] text-[24px] mt-8'>{details.first_name} {details.last_name}</h2>
        <h2 className='font-extrabold text-[#222328] text-[24px] mt-8'>{details.email}</h2>
        </div>
        <div>
        <form onSubmit={handleUpdateProfile}>
      <h2>Update Profile</h2>
      <div>
      <h2>Username</h2>
        <input
          placeholder={details.username}
          type="text"
          name="username"
          value={profile.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
      <h2>Email</h2>
        <input
          placeholder={details.email}
          type="email"
          name="email"
          value={profile.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
      <h2>First Name</h2>
        <input
          placeholder={details.first_name}
          type="text"
          name="first_name"
          value={profile.first_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
      <h2>Last Name</h2>
        <input
           placeholder={details.last_name}
          type="text"
          name="last_name"
          value={profile.last_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
      <h2>Profile Picture</h2>
        <input
          type="file"
          name="image"
          onChange={handleProfilePictureChange}
        />
      </div>
      <button type="submit">Update Profile</button>
    </form>
        </div>
      </div>
      <div className="mt-16">
        <FormField 
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search by user or keyword"
          value={searchText}
          handleChange={handleSearch}
        />      
      </div>
      <div className="mt-10">
        {loading ?(
          <div className="flex justify-center items-center">
            <Loader/> 
          </div>
         ) : (
          <>
            {searchText &&(
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 '>
                    {searchText ? (
                        <RenderCards data={searchedResults} title="No search results found" />
                    ) : (
                        <RenderCards data={allPosts} title="You have no post yet" />
                    )}
            </div>
          </>
         ) 
       }
      </div>
    </section>
    </div>
    </>
  )
}

export default Profile