import React, { use } from 'react'
import { categories } from '../data/CategoryData'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";

export default function Breadcrumb() {
    const { id, subId, itemId } = useParams();
    const category = categories.find(c => c.id === id);
    const subcategory = category?.subcategories?.find(s => s.id === subId);
    const item = subcategory?.items?.find(i => i.id === itemId);

    const navigate = useNavigate();

  return (
    <div className='flex justify-between border-gray-300 border-t p-4'> 
    <nav className='  flex  gap-2 text-sm  items-center '>

        <NavLink to="/" 
            end
        className={ ({isActive})=>isActive? `text-gray-200` : `hover:text-orange-500 `}> Home
        </NavLink>

        {
            id && (
                <div>
                    <span> / </span>
                    <NavLink to={`/product-category/${id}`}
                    end
                      className={ ({isActive})=>isActive? `text-gray-500` : `hover:text-orange-500 `} > {category?.name }
                    </NavLink>
                </div>
            )
        }

        {
            subId && (
                <div>
                    <span> / </span>
                    <NavLink to={`/product-category/${id}/${subId}`}
                    end
                    className={ ({isActive})=>isActive? `text-gray-500` : `hover:text-orange-500 `} > {subcategory?.name}
                    </NavLink>
                </div>
            )
        }

        {
            itemId && (
                <div>
                    <span> / </span>
                    <NavLink to={`/product-category/${id}/${subId}/${itemId}`}
                    end
                    className={ ({isActive})=>isActive? `text-gray-500` : `hover:text-orange-500 `} > {item?.name  }
                    </NavLink>
                </div>
            )
        }

    </nav>

        <button onClick={()=> navigate(-1)} className='' >
            <h1 className='flex items-center gap-2 text-[15px] text-gray-500 hover:text-orange-500 cursor-pointer  '> <GoArrowLeft /> Previous page </h1>
        </button>

     </div>
  )
}
