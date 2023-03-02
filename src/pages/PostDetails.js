import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";
import Loader from "../components/Loader";
import axios from "axios";



const PostDetails = () => {
    const navigate = useNavigate();
    const details = JSON.parse(localStorage.getItem('details')) || {};
    const { _id } = useParams();
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState([])
    const [user, setUser] = useState([])


    const fetchPost = async () => {
        setLoading(true);
       
         await axios.get(`https://wall-ai.fly.dev/api/post/${_id}`)
          .then(res => (setPost(res.data.data)))  
          .then(setLoading(false))
      };

      const fetchUser = async () => {
        setLoading(true);
       
           await axios.get(`https://wall-ai.fly.dev/api/users/${post.userId}`)
          .then(res => (setUser(res.data)))
          .then(setLoading(false))
      };
      
      useEffect(() => {
        fetchPost()  
      }, [])  

      useEffect(() => {
        fetchUser()
      }, [post])

      const deletePost = async (_id) => {
        axios.delete(`https://wall-ai.fly.dev/api/post/${_id}`)
        .then(navigate('/home'))
        .then(console.log(_id))
      }
     
      
  return (
    <section className="max-w-7xl mx-auto text-center">
      <div className="w-full flex justify-between items-center bg-[#f9fafe] sm:px-8 px-4 py-4 ">
        <Link to="/home" className="font-inter front-medium bg-[#6469ff] w-25 text-white px-4 py-2 rounded-md">Back</Link>
        <Link to="/profile" className="font-inter front-medium bg-[#6469ff] w-25 text-white px-4 py-2 rounded-md"> My Wall</Link>
      </div>
      {loading && !post && !user ?(
          <div className="flex justify-center items-center">
            <Loader/> 
          </div> 
         ) :  (
      <div className="flex flex-col"> 
        <h1 className='font-extrabold text-[#666e75] text-[20px]'>Posted by :</h1>
        <div className="flex justify-center items-center" >
         { user.image && <img className="w-24 h-24 rounded-full object-cover flex justify-center items-center m-4 border-2 border shadow-2xl" src={`https://wall-ai.fly.dev${user.image}`} alt="profil"/>}
        <p className='font-extrabold text-[#222328] text-[32px]'>{post.name}</p>
        </div>
        <h3 className='mt-2 text-[#666e75] text-[20px] max-w[500px]'>{post.prompt}</h3>
        <div className=' mt-20 grid lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 grid-cols-1 gap-8 '>
        <img className="w-auto h-auto object-cover rounded-xl " src={post.photo} alt="post"/> 
        <div>
        <Comment post={post && post}/>
        </div>
        {post.userId === details._id && <button className="mb-2 text-white bg-[#ff0000] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={() => deletePost(post._id)}>Delete</button>}
        </div>
      </div>
         )}
    </section> 
  );
};

export default PostDetails
