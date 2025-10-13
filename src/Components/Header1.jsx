// import React from "react";
// import { NavLink } from "react-router-dom";
// import Logo from "../assets/Logo.png";
// import { GoSearch } from "react-icons/go";
// import { PiShoppingCartLight } from "react-icons/pi";

// const navItems = [
//   {
//     label: "Logo",
//     type: "component",
//     component: <img src={Logo} alt="Sasto Gadget" className="w-32" />,
//     to: "/",
//   },
//   {
//     label: "Search Bar",
//     type: "component",
//     component: (
//       <input
//         type="text"
//         placeholder="enter the product name"
//         className="h-1/4 w-1/4 bg-white border-none"
//       />
//     ),
//   },
//   {
//     label: "Account",
//     type: "link",
//     to: "/account",
//   },
//   {
//     label: "Cart",
//     type: "component",
//     component: <PiShoppingCartLight className="cursor-pointer text-white" />,
//     to: "/cart",
//   },
// ];

// export default function Header() {
//   return (
//     <div>
//       <header className="flex gap-6 items-center p-4 bg-gray-900 text-white">
//         {navItems.map((item, index) => {
//           if (item.type === "link") {
//             // text links like Account
//             return (
//               <NavLink
//                 to={item.to}
//                 key={index}
//                 className={({ isActive }) =>
//                   isActive ? "text-yellow-400 underline" : "hover:text-yellow-400 hover:underline"
//                 }
//               >
//                 {item.label}
//               </NavLink>
//             );
//           } else if (item.type === "component") {
//             if (item.to) {
//               // components that have a link (Logo, Cart icon)
//               return (
//                 <NavLink to={item.to} key={index}>
//                   {item.component}
//                 </NavLink>
//               );
//             } else {
//               // components without a link (Search bar)
//               return <div key={index}>{item.component}</div>;
//             }
//           }
//           return null;
//         })}
//       </header>
//     </div>
//   );
// }

/* When type === "link"
<NavLink to={item.to}>{item.label}</NavLink>


item.to → a string like "/account"

item.label → a string like "Account"

So the link is:

<a href="/account">Account</a>


That’s why we use {item.label} → it’s text that should appear inside the link.

✅ When type === "component"
<NavLink to={item.to}>{item.component}</NavLink>


item.to → could be "/cart" or "/" (for logo).

item.component → is JSX, not plain text. For example:

<img src={Logo} />

<input type="text" />

<PiShoppingCartLight />

So it renders like:

<a href="/cart"><svg ...> (cart icon) </svg></a>


or

<div><input placeholder="enter product name" /></div>


👉 Notice here we don’t use {item.label} because we don’t want to show "Cart" text, we want to show the icon.

🔑 The Difference

Links (type: "link") → use {item.label} (plain text).

Components (type: "component") → use {item.component} (JSX element).

💡 So your thinking is correct:

item.to and item.label feel like props → you’re just accessing object values inside JSX.

The only reason we don’t use {item.label} for components is because you already gave them a whole JSX element in item.component.

👉 Quick example:

{ label: "Account", type: "link", to: "/account" }
// gives: <a href="/account">Account</a>

{ label: "Cart", type: "component", to: "/cart", component: <CartIcon /> }
// gives: <a href="/cart"><CartIcon /></a>  */

import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { FaSearch } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiShoppingCart } from "react-icons/pi";
import { useState } from 'react';
import { Link } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/slice/userSlice';

export default function Header1() {

  //acces global state
  const userIdentifier = useSelector((state) => state.user.userIdentifier);

  const dispatch = useDispatch();

  //extract username from email
  const displayName = userIdentifier ? userIdentifier.split("@")[0] : null;


  return (
    < >
      <div className='h-32 flex p-5 bg-[#ECE5A6] justify-around items-center  ' >
        <Link to="/" >
          <img
            src={Logo}
            alt="Sasto Gadget"
            className='w-40 ' />
        </Link>


        <div className=' relative w-1/3 ' >
          <input
            type="text"
            placeholder='Enter the product name'
            className='w-full h-10 pl-4 pr-12 rounded-md border-gray-300 border bg-white'

          />

          <button className='absolute right-0 top-0 h-full px-4 bg-[#FA4F26] text-white  rounded-r-md cursor-pointer ' >
            <FaSearch />
          </button>

        </div>

        <Link
          to="/account"
          className='flex items-center gap-2 cursor-pointer text-white'>
          <VscAccount className=' w-9  h-9   ' />
          <div  >
            <p>Account</p>
            <p className='flex items-end '>
              {/* Login/Register */}
              {displayName ? `Hi, ${displayName}` : "Login/Register"}

              <MdOutlineKeyboardArrowDown /> </p>
          </div>
        </Link>

        <button>
          <PiShoppingCart className='h-9 w-9 text-white  ' />
        </button>

        {/* LogOut Button */}
        {userIdentifier && (
          <button
            onClick={() => dispatch(logout())}
            className="ml-5 bg-red-500 px-3 py-1 rounded text-white"
          >
            LogOut
          </button>
        )}

      </div>
    </>
  )
}
