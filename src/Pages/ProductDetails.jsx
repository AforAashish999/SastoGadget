import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/productData";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/slice/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  if (!product) return <div>Product not found</div>;

  const handleDecrease = () => {  
    if (count > 1) setCount(count - 1);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: count }));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-5 px-10 space-y-8">
      <div className="bg-white flex p-7 rounded-md shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="h-96 w-3/5 object-contain"
        />

        <div className="ml-9 flex flex-col items-start gap-8">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-orange-600 font-semibold text-xl border-gray-200 border-t pt-3">
            Rs {product.price.toLocaleString()}
          </p>

          <div className="flex justify-start gap-7">
            <div className="h-10 flex w-30 border-gray-400 border rounded-sm items-center">
              <button
                onClick={handleDecrease}
                className="cursor-pointer hover:text-orange-500 p-2"
              >
                <RiSubtractFill />
              </button>

              <div className="border-gray-400 border-l border-r w-full flex justify-center items-center font-semibold">
                {count}
              </div>

              <button
                onClick={handleIncrease}
                className="cursor-pointer hover:text-orange-500 p-2"
              >
                <IoIosAdd />
              </button>
            </div>

            <div>
              <button
                className="h-10 w-40 border-orange-600 border rounded-sm text-orange-600 font-bold text-sm hover:bg-orange-600 hover:text-white cursor-pointer"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>

              <button className="h-10 w-40 rounded-sm font-bold text-sm bg-orange-600 text-white hover:bg-orange-700 cursor-pointer ml-2">
                Buy Now
              </button>
            </div>
          </div>

          <div className="border-gray-200 border-t pt-3 text-sm">
            <h3>SKU: 1</h3>
            <p>Categories: Electronic Devices, Powerbanks & Batteries, Powerbanks</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold">Product Description</h1>
        <ul className="list-disc ml-10 mt-7 space-y-1">
          {product.description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
