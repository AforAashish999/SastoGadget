import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CgAsterisk } from "react-icons/cg";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ResetPw() {
    const { register, handleSubmit, formState: {errors}, watch, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data)=> {
        console.log(data);
       const savedUserData = JSON.parse(localStorage.getItem("user"))
    const updatedUserData = {...savedUserData, ...data}
    localStorage.setItem("user", JSON.stringify(updatedUserData))
        //updating password in local storage
        savedUserData.password = data.password;
        localStorage.setItem("user", JSON.stringify(savedUserData));
        toast.success("Password changed successfully");
        reset();
        navigate("/account");
    }
    const password = watch("password");
  return (
    <div className="min-h-screen bg-[#F5F5F5] pl-5 pt-5 mb-5 ">
        <h1 className="text-3xl font-semibold  "> My account </h1>
        <p className='my-5'> Please enter your new password below. Make sure it’s strong and secure — at least 8 characters long, including letters, numbers, and symbols. </p>
        
        <form onSubmit={handleSubmit(onSubmit)} >
            <p className='mt-3 text-sm'> New Password </p>
            <input
             type="password"
             placeholder='Create new password'
             className="border-[#CCCCCC] border rounded-md p-2 bg-white w-2/5 focus:outline-none " 
             {...register("password", {
                required: "Please enter new password",
                pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message: "Minimum eight characters, at least one letter, one number and one special character"
                      }
             } )}
             />                 
             { errors.password && (<p  className="text-xs text-red-500 "> {errors.password.message} </p>)}

              <p className='mt-3 flex text-sm'> Confirm Password <CgAsterisk className='text-red-500' /> </p>
            <input
             type="password"
             placeholder='renter the password'
             className="border-[#CCCCCC] border rounded-md p-2 bg-white w-2/5 focus:outline-none " 
             {...register("confirmPassword", {
                required: "Please enter correct password",
                validate: value => value === password || "The passwords do not match"
              
             } )}
             />                 
             { errors.confirmPassword && (<p  className="text-xs text-red-500 "> {errors.confirmPassword.message} </p>)}

                <br /> <br />
                <button
                 className='border-[#FA4F26] border px-5 py-2 rounded-xs font-semibold text-[#FA4F26] bg-white hover:bg-[#FA4F26] hover:text-white cursor-pointer'
                > Change Password </button>
        </form>
    </div>
  )
}
