import React from "react";
import { useForm } from "react-hook-form";
import { esewa, nabil } from "../assets/images";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      paymentMethod: "esewa",
    },
  });

  const selectedMethod = watch("paymentMethod");

  const onSubmit = (data) => {
    toast.success(`Products are booked`);
    navigate("/");
  };
const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md p-6 rounded-md w-[400px] flex flex-col items-center gap-5"
      >
        {/* ✅ QR section */}
        <img
          src={selectedMethod === "esewa" ? esewa : nabil}
          alt="QR"
          className="h-40 w-40 object-contain"
        />

        {/* ✅ Payment options */}
        <div className="flex flex-col gap-3 w-full">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="esewa"
              {...register("paymentMethod")}
            />
            Esewa
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="bank"
              {...register("paymentMethod")}
            />
            Bank
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="cash"
              {...register("paymentMethod")}
            />
            Cash on Delivery
          </label>
        </div>

        {/* ✅ Submit button */}
        <button
          type="submit"
          className="bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-amber-700 font-semibold cursor-pointer"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
