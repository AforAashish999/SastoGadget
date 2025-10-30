import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { LuAsterisk } from "react-icons/lu";
import { useState } from 'react';

export default function CheckOut() {
const {register, handleSubmit, formState: {errors}, reset} = useForm();
const navigate = useNavigate();
const [province, setProvince] = useState("");
const provinces = [
  "Province 1",
   "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpaschim Province",
];
const onSubmit = (data) => {
           console.log(data);
          //local storage
          localStorage.setItem("user", JSON.stringify(data));
          reset();
          toast.success("Formed Filled up Successfully")
          navigate('/payment')
}
  return (
    <>
    <div className='min-h-screen bg-gray-100 py-5 px-15'>
    <h1 className='text-3xl font-bold mb-5'> Checkout </h1>
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className='bg-white p-5 '>
      <p className='text-[18px] font-bold'> Billing and Shipping </p> <br />

      <div className='flex gap-20'> 
        <div> 
      <p className='flex items-center'>First Name <LuAsterisk className='text-red-500' /> </p>
      <input type="text" placeholder='first name' className='border outline-0 p-1 rounded-sm' />
      </div>
      <div> 
      <p className='flex items-center'>Last Name <LuAsterisk className='text-red-500' /> </p>
       <input type="text" placeholder='last name' className='border outline-0 p-1 rounded-sm' />
       </div>
        </div>
            <br />
        <div>
          <p className='flex items-center'>Country/region <LuAsterisk className='text-red-500' /> </p>
          <p className='font-bold'>Nepal</p>
        </div>

          <br />
         <div> 
      <p className='flex items-center text-rose-900'>Street Address <LuAsterisk className='text-red-500' /> </p>
       <input type="text" placeholder='House number and street name' className='border w-1/2 p-1 rounded-sm outline-0' />
       </div>
<br />
         <div> 
      <p className='flex items-center'>Town / City <LuAsterisk className='text-red-500' /> </p>
       <input type="text"  className='border w-1/2 p-1 rounded-sm outline-0' />
       </div>
       <br />
        <div> 
      <p className='flex items-center'>State / Zone <LuAsterisk className='text-red-500' /> </p>
       <select
        value={province}
        onChange={(e)=> setProvince(e.target.value)}
       >
        <option value="" > Select your Province </option>
        {
          provinces.map((prov,index)=>(
            <option
             key={index}
              value={prov}
             >
              {prov}
              </option>
          ))
        }
       </select>
  {province && <p className="mt-2 text-sm text-gray-600">Selected: {province}</p>}
       </div>
        <br />
        
       <div>
        <p>Postcode / ZIP (optional)</p>
        <input type="text" className='border w-1/2 p-1 rounded-sm outline-0'  />
       </div>

       <br />
        <div> 
      <p className='flex items-center'>Mobile No <LuAsterisk className='text-red-500' /> </p>
       <input type="number"
         className='border w-1/2 p-1 rounded-sm outline-0'
          {...register("number",
           {
            required: "Please enter valid mobile no",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "mobile no should contain exactly ten digits"
          }            } )}  />
          {errors.number && (<p className="text-xs text-red-500 "> {errors.number.message} </p>)}
       </div>

       <br />
        <div> 
      <p className='flex items-center'>Email Address <LuAsterisk className='text-red-500' /> </p>
       <input type="email" 
        className='border w-1/2 p-1 rounded-sm outline-0'
         {...register("email",
           {
          required: "Please enter valid email",
          } )} />
         {errors.email && (<p className="text-xs text-red-500 "> {errors.email.message} </p>)}
       </div>

       <br />
        <div> 
      <p className='text-[18px] font-semibold'>Additional Information </p> <br />
      <p> Order notes (optionsl) </p>
        <textarea
    placeholder='Notes about your order, e.g. special instructions for delivery'
    className='border w-1/2 h-32 p-2 rounded-sm outline-0 resize-none'
  />
       </div>

       <br /> <br /> <br />
<button
 className=' border-orange-500 border rounded-md w-1/2 py-2 cursor-pointer font-bold text-orange-600 hover:text-white hover:bg-orange-500 '>
 Payment </button>

 <br /> <br /> <br />
    </form>

    </div>
  
    
    </>
  )
}
