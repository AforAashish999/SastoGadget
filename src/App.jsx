import React from "react";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Account from "./Pages/Account";

import { ToastContainer } from "react-toastify";
import LostPw from "./Pages/LostPw";
import ResetPw from "./Pages/ResetPw";

function App() {
  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={1000} //sec
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss //it stops
        draggable //drag grera falne
        // pauseOnHover
        // toastClassName="!bg-gradient-to-r from-red-700 via-red-600 to-slate-700 !text-white  !rounded-xl !font-bold custom-successToast"
        // bodyClassName="!font-semibold"
      />
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
         <Route index element={<Home />} />
         <Route path="/account" element={<Account />} />
         <Route path="/lostpw" element={<LostPw /> } />
         <Route path="/resetpw" element = {<ResetPw />} />
        </Route>
       
      </Routes>
    </>
  );
}

export default App;
