import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { removeFromCart, increaseQty, decreaseQty } from "../Redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CartPopup() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.items);
  const subTotal = useSelector((state) => state.cart.totalPrice)
  const [show, setShow] = useState(0);

  return (
    <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg p-3 min-w-[350px] max-h-[400px] overflow-y-auto z-50">
      {
        products.length === 0 ? (
          <p className="text-gray-600 text-center py-4">Your cart is empty</p>
        ) : (

          products.map((product) => (
            <div
              key={product.id}
              
            >
                <div className="flex items-start gap-3 border-b border-gray-200 py-3">
              <img
                src={product.image}
                alt={product.name}
                className="h-16 w-16 object-cover rounded-sm" />

              <div className="flex-1">
                <h1 className="font-semibold text-sm text-gray-800 ">{product.name}</h1>

                {/* count button and price */}
                <div className="flex items-center gap-4" >
                  <div className="h-8 flex border-gray-400 border rounded-sm mt-2">
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
                  <p className="text font-semibold text-orange-600">
                    Rs {product.price.toLocaleString()}
                  </p>
                </div>
              </div>
              {/* delete button */}
              <button
                onClick={() => dispatch(removeFromCart({ id: product.id }))}
                className="text-orange-600 hover:text-orange-700 mt-1 cursor-pointer" >
                <MdDeleteOutline size={20} />
              </button>
               </div>

            </div>
          ))
        )
      }
              {/* second section */}
              <div className="p-2 " >
                {/* Total Price */}
                <p className="flex justify-between" >SubTotal: <span className="text-orange-600 font-semibold"> Rs {subTotal.toLocaleString()}  </span></p>
                {/* view and checkout button */}
                <div className="mt-4">
                  <Link to={`/viewcart`}
                    className=" py-1 px-4 border-orange-600 border rounded-sm text-orange-600 hover:bg-orange-600 hover:text-white cursor-pointer" >
                    View Cart
                  </Link>
                  <Link to={`/checkout`}
                    className="py-1 px-4 rounded-sm bg-orange-600 text-white hover:bg-orange-700 cursor-pointer ml-4">
                    Checkout
                  </Link>
                </div>
              </div>


    </div>
  );
}
