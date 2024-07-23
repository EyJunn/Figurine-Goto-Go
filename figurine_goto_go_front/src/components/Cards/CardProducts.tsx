'use client'

import { getImage } from '@/Services/image'
import { getAllProducts } from '@/Services/products'
import { Products } from '@/Utils/type'
import React, { useEffect, useState } from 'react'

const CardProducts = () => {
  const [article, setArticle] = useState<Products[]>()
  const [image, setImage] = useState() 

  useEffect(() => {
    getAllProducts().then((res) => {
      setArticle(res)
      
    })


  }, [])

  return (
    <div>
      {article &&
        article.map((product) => {
          return (

            <div className='flex flex-wrap' key={product.id}>
              <div className='flex flex-col border w-1/3 p-2 m-2 text-center items-center'>
                <h1>{product.name}</h1>
                <img src={""} alt="image de figurine" />
                <p>{product.weight}</p>
                <p>{product.height}</p>
                <p>{product.price} $ </p>
                <p>{product.category}</p>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default CardProducts