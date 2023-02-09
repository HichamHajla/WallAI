import { useState,useEffect } from "react"
import axios from "axios"


const Comment = ({post}) => {
    const details = JSON.parse(localStorage.getItem('details')) || {};
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('')
    const [author, setAuthor] = useState("");
    
      const handleCommentChange = (event) => {
        setNewComment(event.target.value);
      }; 
    
    const getComments = async () => {
       post._id &&  await axios.get(`https://wall-ai.fly.dev/api/comment/post/${post._id}`) 
        .then(res => setComments(res.data.data))
          .catch(error => console.error(error))
          .finally(() => setLoading(false));
    }; 

    const handleSubmit = async (event) => {
        event.preventDefault();

    const newCom = { 
        author : details.username, 
        comment : newComment,
        userId: details._id, 
        postId: post._id}
    try {
      const response = await axios.post("https://wall-ai.fly.dev/api/comment", newCom);

      setComments([...comments, response.data]);
      setAuthor("");
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

      useEffect(() => {
        getComments()

      }, [post._id])  

      const deleteComment = async (idComment) => {
        axios.delete(`https://wall-ai.fly.dev/api/comment/${idComment}`)
        .then(() => {
          setComments(prevComments => prevComments.filter(comment => comment._id !== idComment));
        });
      }
    
     
  return (
    <>
    <h1 className='font-extrabold text-[#222328] text-[32px] mb-6'>Comments</h1> 
    <div> 
    {comments && comments.map(e => {
        return(
        <div className="mb-2" key={e._id}>
        <h2 className='font-extrabold text-[#222328] text-[20px] text-left'>{e.comment}</h2>
        <h2 className='text-[#666e75] text-left'>By : {e.author}<span className='text-[#666e75] text-[12px]'> {new Date(e.date).toLocaleString()}</span> </h2>
        {e.userId === details._id && <button className="mb-2 text-white bg-[#ff0000] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={() => deleteComment(e._id)}>Delete</button>}
        </div> 
        )})}
    </div>  
    <div className='mt-4'>
    <form onSubmit={handleSubmit}>
        <h1 className="text-left">Add a Comment</h1>
        <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
          type="text"
          placeholder="Comment"
          value={newComment}
          onChange={handleCommentChange}
        />
        <button  className="mt-3 text-white bg-green-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center" type="submit">Post Comment</button>
      </form>
    </div>
    </>
      
  )
}

export default Comment