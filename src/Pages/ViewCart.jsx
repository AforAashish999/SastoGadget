import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { removeFromCart, increaseQty, decreaseQty } from "../Redux/slice/cartSlice";

export default function ViewCart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.items);
  const subTotal = useSelector((state) => state.cart.totalPrice)
  return (
    <>
      <div className='min-h-screen  bg-[#F5F5F5] px-10 pt-10 '>
        <div className=' p-5  bg-white'>

          {/* making header */}
          <div className='grid grid-cols-6 font-bold mb-2 border-gray-300 border-b pb-3'>
            <p className='col-span-3'> Product </p>
            <p className='text-center'> Price </p>
            <p className='text-center' > Qty </p>
            <p className='text-center' > Total Price</p>
          </div>
          {

            products.map((product) => (
              <>
                <div
                  key={product.id}
                  className="grid grid-cols-6  items-center border-gray-300 border-b p-3 "
                >
                  <div className='flex items-center gap-4 col-span-3'>
                    <img src={product.image} alt="image" className="h-15 w-15" />
                    <h3 className='clamp-2-midword ' > {product.name} </h3>
                  </div>

                  <p className="text-orange-600 font-bold place-self-center  "> Rs {product.price.toLocaleString()} </p>
                  <div className="h-8 flex border-gray-400 border rounded-sm mt-2 place-self-center">
                    <button
                      onClick={() => dispatch(decreaseQty({ id: product.id }))}
                      className="cursor-pointer hover:text-orange-500 p-1"  >
                      <RiSubtractFill />
                    </button>
                    <div className="border-gray-400 border-l border-r w-8 flex justify-center items-center font-semibold text-sm">
                      {product.qty}
                    </div>
                    <button
                      onClick={() => dispatch(increaseQty({ id: product.id }))}
                      className="cursor-pointer hover:text-orange-500 p-1"                  >
                      <IoIosAdd />
                    </button>
                  </div>

                  <div className=' flex justify-between'>
                    <p className='ml-18 text-orange-600 text-[17px] font-bold'>  Rs {(product.price * product.qty).toLocaleString()} </p>
                    <button className="flex items-start cursor-pointer"
                     onClick={() => dispatch(removeFromCart({ id: product.id }))}  >
                      <MdDeleteOutline className="text-orange-500 size-6 hover:text-orange-800 " /> </button>
                  </div>

                </div>
              </>
            ))
          }
          <div className='mt-3 p-3 '>
            <p className='font-bold mb-5 flex gap-3 items-end'> Subtotal:
              <span className="text-orange-600 font-bold text-xl">Rs: {subTotal.toLocaleString()}  </span></p>
            <Link to={`/checkout`}
              className="bg-orange-600 text-white font-bold hover:bg-amber-700 px-30 py-2 rounded-md  ">
              Proceed To Checkout
            </Link>
          </div>




        </div>
      </div>
    </>
  )
}
