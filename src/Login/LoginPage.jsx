import React, { useState } from "react";
import img from "../assets/image 28 (Traced).png"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    let userDetails = {
        username,
        password
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
    

    async function user() {
        try{
            const response = await fetch("/api/login",options);
            const data = await response.json();
            console.log(data)
            if (data.status_code !== 400) {
                Cookies.set("jwt_token",data.jwt_token);
                navigate("/home")
            }else{
                alert("Invalid username or password")
                navigate("/")
            }
        }catch{
              alert("An Error Occurred")
        }
    }
    user()

   
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={img} className="h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">NXT Assess</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1 text-sm" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1 text-sm" htmlFor="password">
              PASSWORD
            </label>
            <input
              type={"password"}
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          

          <div className="text-red-500 text-sm mb-4">{error}</div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
