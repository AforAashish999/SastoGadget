import React, { useState } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQty, 
  decreaseQty,
} from "../Redux/slice/cartSlice";
import CartPopup from "./CartPopup"

export default function Cart() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cart.totalQty);
  const [showPop, setShowPop] = useState(false);
  return (
    <div className="relative" >
      <div className="cursor-pointer" onClick={() => setShowPop((prev) => !prev) }>
        <PiShoppingCart className="h-9 w-9 text-white  " />
       
      </div>
      <div className="h-4 w-4 bg-white absolute right-0 top-0 rounded-sm flex items-center justify-center ">
        <h1 className=" font-semibold text-orange-600"> {count} </h1>
      </div>
   {showPop && (
    <>
    {/* background */}
    <div
     onClick={()=> setShowPop(false)}
     className="fixed inset-0 bg-black/20 z-40"
    >
    </div>
    {/* popup */}
    <div
    className="absolute right-0 z-50">
        <CartPopup />
    </div>
    </>
   ) }
    
    </div>
  );
}
