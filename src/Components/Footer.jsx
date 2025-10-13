import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="h-92 bg-[#FFFFFF] p-5">

      <div className="h-3/5 border-gray-400 border-t border-b flex ">
        <div className="w-1/2  h-full flex justify-center  ">
          <h1 className="text-3xl mt-5">Connect with us ... </h1>
        </div>

        <div className=" bg-[#FFFFFF] h-full w-1/2 grid grid-cols-2">
          <div className=" flex flex-col items-start  pl-10 justify-around">
            <h3 className="text-2xl font-semibold text-start">Main Office</h3>
            <div>
              <h5>Mid Baneshwor, Kathmandu</h5>
              <h5>Nepal</h5>
            </div>
            <p className="text-2xl text-green-600 font-semibold">9818748191 </p>
          </div>
          <div className=" flex flex-col gap-5 pt-5 ">
            <h5 className="font-bold  ">Social Media </h5>
            <div>
              <a href="#" className="flex items-center">
                {" "}
                <FaFacebook className="text-xl text-blue-700 " />{" "}
                <span className="text-xl">Facebook</span>{" "}
              </a>
              <a href="#" className="flex items-center">
                {" "}
                <FaInstagram className="text-xl text-pink-600 " />{" "}
                <span className="text-xl">Instagram</span>{" "}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className=" h-2/5 flex items-center" >
        <div className="flex items-center text-gray-600 text-sm gap-1  "><FaRegCopyright />  2023 sastogadgets.com. All Rights Reserved. </div>
      </div>

    </div>
  );
}
