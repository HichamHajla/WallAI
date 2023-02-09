import { useState } from "react";
import { useNavigate } from "react-router-dom";
import preview from "../assets/preview.png";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import { getRandomPrompt } from "../utils";
import jwt_decode from "jwt-decode";


const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
    userId: ""
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  // const details = JSON.parse(localStorage.getItem('details')) || {};

  const generateImage =  async () => {
    if(form.prompt) {
      try{
        setGeneratingImg(true);
        const response = await fetch('https://wall-ai.fly.dev/api/wall', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })
        
        const data = await response.json();
        const token = await localStorage.usertoken;
        const decoded = await jwt_decode(token);

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`, userId : decoded.user._id})
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Please enter a prompt to generate an image')
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo){
      setLoading(true);

      try{
        const response = await fetch('https://wall-ai.fly.dev/api/post',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(form)
        })
        await response.json()
        navigate('/home')
      } catch (err) {
        alert(err)
      } finally {
        setLoading(false)
      }

    } else {
      alert('Please enter a prompt to generate a new image') 
    }
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt})
  };

  return (
    <>
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create imaginative and visually stunning images through Wall AI and
          share them on the Community Wall
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Username"
            type="text"
            name="name"
            placeholder="John doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An oil painting portrait of a capybara wearing medieval royal robes and an ornate crown on a dark background"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
            <button 
                type="button"
                onClick={generateImage}
                className="text-white bg-green-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
            {generatingImg ? 'Generating...' : 'Generate'}
            </button>
        </div>

        <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[16px]">You like the image you just created ? Post it on the Wall and share it with the community !</p>
            <button 
                type="submit"
                className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    {loading ? 'Sharing...' : 'Share it on the Wall'}
                </button>
        </div>
      </form>
    </section>
    </>
  );
}

export default CreatePost
