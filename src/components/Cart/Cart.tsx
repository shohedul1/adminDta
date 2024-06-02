import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Cart = () => {
    return (
        <>
        <div className="w-full bg-emerald-50 gap-3 flex flex-col rounded-2xl p-5 hover:scale-105 hover:shadow-lg transition-all duration-300 hover:shadow-orange-500">
            <div className="w-full min-h-80	">
                <Image src={"/food_18.png"} priority alt="iamge" width={100} height={100} className="w-full h-full" />
            </div>
            <div className="flex justify-between">
               <div>
               <h1 className="text-2xl font-bold">Name</h1>
               <h2 className='text-xl font-bold text-gray-400'>Category</h2>
               </div>
                <span>rating</span>
            </div>
            <div className="flex items-center justify-center">
                <Link href={"/blog/id"} className='px-3 py-2 bg-lime-500 rounded-full hover:scale-110 hover:border-2 hover:border-red-500'>Overview</Link>
            </div>
        </div>
        </>
    )
}

export default Cart