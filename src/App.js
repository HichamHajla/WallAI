import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Register from "./pages/Register";
import CreatePost from './pages/CreatePost'
import Login from "./pages/Login";
import Landing from "./pages/Landing"
import Layout from "./Layout";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./utils/protectRoutes";


const App = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />}/>
          <Route path="" element={<Layout/>}>
          <Route path="/home" element={<Home />}/>
          <Route path="/create-post" element={<CreatePost />}/>
          <Route path="/post-details/:_id" element={<PostDetails />}/>
          </Route>
          </Route>
        </Routes>
    </>
  );
};

export default App;
