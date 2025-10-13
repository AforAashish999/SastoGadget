import React from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Account() {
  const [login, setLogin] = useState(true);
  const location = useLocation();
  console.log(location.state)
  
useEffect( ()=> {
  if(location.state?.showLogin) {
    setLogin(true);
  }
}, [location] )
  return (
    <>
      <div className="h-screen bg-[#F5F5F5]  ">
        <h1 className="text-3xl font-semibold p-5 "> My account </h1>
        
  <div className="flex justify-center gap-10 mb-7  } ">
    <button
    onClick={() => setLogin(true)}
    className="text-2xl  cursor-pointer">
      Login 
    </button>
    
    <button
    onClick={()=> setLogin(false)}
    className="text-2xl  cursor-pointer">
      Register
    </button>
  </div>
    
    {
      login ? <Login  /> : <Register />
    }

      </div>
    </>
  );
}


//login
/**
 *    <div className="w-full h-full  flex justify-center   ">
          <div className="w-2/5 h-2/3 p-5 bg-white ">
            <div className="flex justify-center gap-10 mb-7">
              <p className="text-2xl font-semibold">Login </p>
              <p className="text-2xl font-semibold">Register </p>
            </div>
            <p className="text-sm mb-6 ">Enter your Username and Password to Login </p>
            <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  gap-4  ">
              <input type="text" placeholder="Username or email" className="border-[#CCCCCC] border rounded-md p-2 " />
              <input type="password" placeholder="Password" className="border-[#CCCCCC] border rounded-md p-2 " />
              
              <div className="flex  gap-2 "> 
            <input type="checkbox" id="remember" className="scale-110 accent-[#ED4B24] cursor-pointer " />
            <label htmlFor="remember" >Remember Me  </label>
             </div>

            <button className="bg-[#ED4B24]  text-white font-bold p-2 rounded-md cursor-pointer " >
              Login</button>
            <Link to="/lostPw" 
            className="text-[#ED4B24] text-center "
            > Lost Password? </Link>
            </form>
          </div>
        </div>
 */