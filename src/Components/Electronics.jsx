import React from 'react'
import { products } from '../data/productData'
import { Link } from 'react-router-dom'

export default function Electronics() {
  return (
    <>
    <div className='min-h-screen'>

        <div className='bg-orange-400 flex py-2 px-5 items-center gap-15'>
            <h1 className='text-4xl font-semibold text-white'> Electronics </h1>
            <Link 
            to={`/product-category/electronic-devices`}
            className='text-black font-semibold text-xl border rounded-xl p-1 hover:bg-orange-500 hover:text-white' > View All </Link>
        </div>

        <div className='grid grid-cols-4'> 
    {products.slice(0,8).map((product)=> (
            <div
            key={product.id} 
            className=' h-100 p-10 border-gray-300 hover:border'
            > 
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt="img" className='h-60 w-60 ' />
                <p className="text- mt-3 clamp-2-midword " > {product.name} </p>
                <p className='text-orange-600 font-bold'> Rs {product.price.toLocaleString()} </p>
            </Link>
            </div>

        ))}
    </div>

    </div>
    </>
  )
}
