
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function Register() {
     const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    
      const onSubmit = (data) => {
        console.log(data);
        //local storage
        localStorage.setItem("user", JSON.stringify(data));
        reset();
        toast.success("Register Successfully")
        navigate("/account", {state: {showLogin:true} } );
      }
    
  return (
    <>
       <div className="w-full h-full  flex justify-center   ">

              <div className="w-2/5 h-2/3 p-5 bg-white ">

                <p className="text-sm mb-6 ">Please fill the given credentials </p>
                
                <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col  gap-4  ">
                  <input
                   type="text"
                   placeholder=" Please enter your Name"
                   className="border-[#CCCCCC] border rounded-md p-2 focus:outline-none "
                   {...register("name", {required: "Please fill your name"})} />
                  { errors.name && (<p className="text-xs text-red-500 "> {errors.name.message} </p>) }

                  <input 
                   type="email"
                  placeholder="Please enter your Email"
                   className="border-[#CCCCCC] border rounded-md p-2 focus:outline-none"
                    {...register("email", {required: "Please enter valid email"} )} />
                    {errors.email && (<p className="text-xs text-red-500 "> {errors.email.message} </p>)}
                 


                  <input
                   type="password"
                  placeholder="Please create your Password"
                   className="border-[#CCCCCC] border rounded-md p-2 focus:outline-none " 
                   {...register("password",
                     {
                    required: "Please create your Password",
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message: "Minimum eight characters, at least one letter, one number and one special character"
                      }
                  })}  />
                   { errors.password && (<p className="text-xs text-red-500 "> {errors.password.message} </p> )  }
                  
                  
    
                <button className="bg-[#ED4B24]  text-white font-bold p-2 rounded-md cursor-pointer hover:bg-orange-700 " >
                  Register </button>
                
                </form>
              </div>
            </div>
    </>
  )
}
