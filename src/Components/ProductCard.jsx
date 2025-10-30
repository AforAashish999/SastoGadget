import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

export default function ProductCard({ products }) {
  //SORTING
  const [sort, setSort] = useState("default");
  // const sortedProducts = [...products].sort((a,b)=> {
  //   if(sort === "priceLowHigh") return a.price - b.price;
  //   if(sort === "priceHighLow") return b.price - a.price;
  //   if(sort === "nameAZ") return a.name.localeCompare(b.name);
  //   if(sort === "nameZA") return b.name.localeCompare(a.name);
  //   console.log("sorting re-rendered")
  //   return 0;
  // })
  //its rendering 9 times in every parent rerender so using useMemo
  const sortedProducts = useMemo(() => {
    console.log("Sorting run........");
    const arr = [...products];
    switch (sort) {
      case "priceLowHigh":
        return arr.sort((a, b) => a.price - b.price);
      case "priceHighLow":
        return arr.sort((a, b) => b.price - a.price);
      case "nameAZ":
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case "nameZA":
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return arr;
    }
  }, [sort, products]);
  //depedency chai sort ra products change vyema mtra render hunxa ntra hudaina

  // PAGINATION
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);
  const goToPage = (p) => {
    const next = Math.max(1, Math.min(totalPages, p));
    setPage(next);
  };

  return (
    <div className="bg-[#F5F5F5] py-7 px-12 min-h-screen">
      {/* SORTING */}
      <div className="bg-white p-4 flex justify-between">
        <h1> Powerbanks </h1>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 cursor-pointer border-gray-300 border rounded-sm outline-none "
        >
          <option value="default"> Sort By </option>
          <option value="priceLowHigh"> Price: Low to High </option>
          <option value="priceHighLow"> Price: High to Low </option>
          <option value="nameAZ"> Name: A to Z </option>
          <option value="nameZA"> Name: Z to A </option>
        </select>
      </div>
      {/* PRODUCTS */}
      <div className=" grid grid-cols-5 border-gray-200 border-t bg-white ">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="h-80 w-full  hover:border-gray-300 hover:border p-5"
          >
            <Link to={`/product/${product.id}`} className="h-full w-full ">
              <img
                src={product.image}
                alt="Yamaha Powerbank"
                className="h-50 w-full object-cover"
              />
              <h1 className="text- mt-3 clamp-2-midword "> {product.name} </h1>
              <p className="text-orange-500 font-semibold mt-1">
                {" "}
                Rs {product.price.toLocaleString()}{" "}
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* PAGINATION BUTTONS */}
      <div className="flex bg-white  h-40 justify-center items-center p-2 gap-2">
        <button onClick={() => goToPage(page - 1)} disabled={page === 1} className=" border-gray-300 border p-2 rounded-sm">
         <RiArrowLeftWideFill  />
        </button>
             {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-3 py-1 border-gray-300 border rounded ${
                page === p ? "bg-orange-500 text-white" : "bg-white"
              }`}
            >
              {p}
            </button>
          );
        })}
        <button onClick={() => goToPage(page + 1)} disabled={page === totalPages} className=" border-gray-300 border p-2 rounded-sm">
       <RiArrowRightSLine />
        </button>
      </div>
    </div>
  );
}

/*
what i want to ask is doesn't usememo was used to stop rerendering, so previously it was rerendering 9 time per click now
 only one when i go to product details page and comee back, so when i go to details page the it unmounts and details page mounts 
 and vice verse, so mount mean opening yes? so i stopped the rerendering 9 times thats the achievement??

so when coming back from details page to product card, product card mounts means it is fresh like opening first time
 so sorting rerenders, am i correct
 */
