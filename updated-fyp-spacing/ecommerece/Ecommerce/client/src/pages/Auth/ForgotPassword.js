
import Layout from '../../components/Layout/Layout'
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [question, setQuestion] = useState("");
 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        question
      });
      if (res && res.data.success) {

        toast.success(res.data.message); // Ensure consistency in the message key
        
        localStorage.setItem("auth", JSON.stringify(res.data));
       console.log("done")
    navigate("/login");
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
<Layout title={"Forgot Password"}>
<div className="form-container">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
         
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword" placeholder="Enter your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="form-control"
              id="exampleInputQuestion" placeholder="Name of Your Best Friend?"
              required
            />
          </div>
        
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
</Layout>
   </>
  )
}

export default ForgotPassword
