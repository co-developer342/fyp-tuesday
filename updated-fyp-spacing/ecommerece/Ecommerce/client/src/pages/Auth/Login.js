import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";


const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [auth,setAuth]=useAuth()

  const navigate = useNavigate();
const location=useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {

        toast.success(res.data.message); // Ensure consistency in the message key
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        })
        localStorage.setItem("auth", JSON.stringify(res.data));
       
    navigate(location.state || "/");
      } else {
        toast.error(res.data.message); // Ensure consistency in the message key
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
       <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1 className="text-center mb-3">Login Now</h1>
         
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail" placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword" placeholder="Enter your Password"
              required
            />
          </div>
         <div className="mb-3">

          <button type="btn" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
            Forgot Password
          </button> 
         </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
    </>
  )
}

export default Login
