import React from "react";
import { categories } from "../data/CategoryData.js";
import { AiOutlineDown } from "react-icons/ai";
import { Link } from "react-router-dom";


export default function Header2() {
  return (
    <div className="h-12 w-screen bg-white flex justify-evenly items-center">
      {categories.map((category) => (
        <div key={category.id} className="relative group">
          <Link
            to={`/product-category/${category.id}`}
            className="hover:text-orange-600 "
          >
            <h1 className="flex items-center gap-1 text-sm font-semibold">
              {category.name}
              <AiOutlineDown className=" transition duration-500 delay-150 ease-in-out  hover:rotate-180  " />
            </h1>
          </Link>

          {category.subcategories && (
            <div className="absolute hidden group-hover:block bg-white shadow-xl/30 w-64 px-5 py-10 z-50 ">
              <ul>
                {category.subcategories.map((sub) => (
                  <li key={sub.id} className="relative group/sub">
                    <Link
                      to={`/product-category/${category.id}/${sub.id}`}
                      className="hover:text-orange-600 text-sm my-1 w-full font-semibold block "
                    >
                      {sub.name}
                    </Link>
                    {sub.items && (
                      <div className=" absolute left-full top-0 hidden group-hover/sub:block w-72 bg-white shadow-xl/20  p-5 ">
                        <ul>
                          {sub.items.map((item) => (
                            <li key={item.id}>
                              <Link
                                to={`/product-category/${category.id}/${sub.id}/${item.id}`}
                                className="block hover:text-orange-600 text-sm font-semibold my-1 w-full"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
