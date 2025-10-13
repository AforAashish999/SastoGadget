import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CgAsterisk } from "react-icons/cg";

export default function LostPw() {
  const { register, handleSubmit, formState: {errors }, reset } = useForm();
  const navigate = useNavigate();
  const savedUserData = JSON.parse(localStorage.getItem("user"));

  const onSubmit = (data) => {
    console.log(data);
    reset();
    navigate("/resetpw")
  }

  return (
   <div className="min-h-screen bg-[#F5F5F5] pl-5 pt-5  ">
        <h1 className="text-3xl font-semibold  "> My account </h1>

        <p className=' pt-5 pb-5 '>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <p className='flex mb-3  '>UserName or email <CgAsterisk className='text-red-500' /> </p>
        <input 
        type="text"
        className="border-[#CCCCCC] border rounded-md p-2 w-1/3 bg-white  " 
        {...register("loginId", 
          {
            required: "Please enter valid Username or email ",
            validate: value => 
              value === savedUserData.name ||
              value === savedUserData.email ||
              "Please enter correct Username or email"
          }
        )}/>
        {errors.loginId && (<p className="text-xs text-red-500 " > {errors.loginId.message} </p>)}

        <br /> <br />
        <button
        className='border-[#FA4F26] border px-5 py-2 rounded-xs font-semibold text-[#FA4F26] bg-white hover:bg-[#FA4F26] hover:text-white '
        > Reset Password </button>
        </form>
    </div>
  )
}
