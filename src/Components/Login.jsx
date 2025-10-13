
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LostPw from "../Pages/LostPw";
import { useState } from "react";



import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

//redux
import { useDispatch } from "react-redux";
import { login } from "../Redux/slice/userSlice";

export default function Login() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  //getting local  storage value
  const savedUserData = JSON.parse(localStorage.getItem("user"));

  // const onSubmit = (data) => {
  //   console.log(data);
  //   setFormData(data);
  //   reset();
  //   toast.success("LogIn Successfully")
  //   navigate("/");
  // }

  //redux
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);

    const loginId = data.loginId === savedUserData.name ? savedUserData.name : savedUserData.email;
    dispatch(login(loginId));
    //these loginId will be either username or email and will be stored in the global state redux
    //here =>   login: (state, action)=> {
    // state.userIdentifier = action.payload;
    //  localStorage.setItem("loggedInUser", action.payload);

    //and later header1 will extract username or email from, userIdentifier

    toast.success("Logged In Successfully");
    reset();
    navigate("/");

  }

  return (
    <>
      <div className="w-full h-full  flex justify-center   ">
        <div className="w-2/5 h-2/3 p-5 bg-white ">


          <p className="text-sm mb-6 ">Enter your Username and Password to Login </p>
          <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  gap-4  ">
            <input
              type="text"
              placeholder=" Username or email "
              className="border-[#CCCCCC] border rounded-md p-2 focus:outline-none "
              {...register("loginId",
                {
                  required: "Please enter valid email or userName",
                  validate: value =>
                    value === savedUserData.email ||
                    value === savedUserData.name ||
                    "Please enter correct email or userName"
                }
              )} />
            {errors.loginId && (<p className="text-xs text-red-500 " > {errors.loginId.message} </p>)}

            <input
              type="password"
              placeholder="password"
              className="border-[#CCCCCC] border rounded-md p-2 focus:outline-none "
              {...register("password",
                {
                  required: "Please enter valid password",
                  validate: value => value === savedUserData.password || "wrong password"
                }
              )} />
            {errors.password && (<p className="text-xs text-red-500" > {errors.password.message} </p>)}

            <div className="flex  gap-2 ">
              <input type="checkbox" id="remember" className="scale-110 accent-[#ED4B24] cursor-pointer " />
              <label htmlFor="remember" >Remember Me  </label>
            </div>

            <button
              className="bg-[#ED4B24] text-white font-bold p-2 rounded-md cursor-pointer hover:bg-orange-700 " >
              Login</button>

            <Link to="/lostpw"
              className="text-[#ED4B24] text-center "
            > Lost Password? </Link>
          </form>
        </div>
      </div>
      {/* <Account savedUserData={savedUserData} /> */}
    </>
  )
}


