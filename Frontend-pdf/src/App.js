import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostPage from "./pages/PostPage";
import UserProvider from "./context/UserProvider";
import Privateroute from "./components/Privateroute";
import Userdashboard from "./pages/user-routes/Userdashboard"; 
import Forgotpass from "./components/forgotpass";
import Setpassword from "./components/Setpass";
import SearchBar from "./components/SearchBar";
import Verify from "./components/Verify";
function App() {
  return (
    <UserProvider>        
      <BrowserRouter>
        <ToastContainer position="bottom-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/forgotpass" element={<Forgotpass />}/>
          <Route path="/search" element={<SearchBar/>}/>
          <Route path="/setpass" element={<Setpassword/>}/>

{/* 
          <Route path="/verify-account" element={<Verify/>}/> */}
          <Route path="/login" element={<Login />} />
          


          <Route path="/user" element={<Privateroute />}>
            <Route path="dashboard" element={<Userdashboard />} />
            {/* <Route path="profile-info/:userId" element={<ProfileInfo />} />
            <Route path="update-blog/:blogId" element={<UpdateBlog />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
