'use client'


import { useStoreCart, useStoreCount } from '@/Stores/StoresCart'
import Image from 'next/image'
import React from 'react'

const CardCart = () => {
    const { cart, removeCart } = useStoreCart((state) => state)
    const { count } = useStoreCount((state) => state)

    return (
        <div>
            {cart &&
                cart.map((product: any) => {
                    return (

                        <div className='flex flex-wrap' key={product.product?.id}>
                            <div className='flex flex-col border w-1/3 p-2 m-2 text-center items-center'>
                                <h1>{product.product?.name}</h1>
                                <Image width={100} height={100} src={product.product?.image} alt="product" className='w-1/2' />
                                <p>{product.product?.weight}</p>
                                <p>{product.product?.height}</p>
                                <p>{product.product?.price} $ </p>
                                <p>{product.product?.category}</p>
                                <button className='border-2' onClick={() => {
                                    removeCart(product.id)
                                }}>Delete</button>
                            </div>

                        </div>
                    )
                })}
            <div className='bg-white w-64 h-32 text-black absolute top-24 right-64 rounded'>
                <p className='text-center'> All Article {cart.length} </p>
                <p className='text-center'> Total to pay: {count} $ </p>
                <button className='rounded-full h-10 bg-blue-500 ml-16 p-2'>Checkout </button>
            </div>
        </div>
    )
}

export default CardCart