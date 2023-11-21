// import MiniNav from '@/components/mini-nav'
import MiniNav from '@/components/mini-nav'
import ProductGallery from '@/components/product-gallery'
import ProductInfo from '@/components/product-info'
import YouMayAlsoLike from '@/components/you-may-also-like'
// import YouMayAlsoLike from '@/components/you-may-also-like'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import React from 'react'

const page = async({params}) => {

  const product = await client.fetch(groq`*[_type == "product" && slug.current == "${params.slug}"][0]`, {
    next: { revalidate: 30 },
  })
  const products = await client.fetch(groq`*[_type == "product"]`, {
    next: { revalidate: 30 },
  });

  const miniLinks = [
    { text: "home", link: "/" },
    { text: product.name, link: "" },
  ]
  
  return (
    <div className='main pt-28'>
            <MiniNav links={miniLinks} />
            <div className="mx-auto w-full">
        {/* Product */}
        <div className="relative pb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 w-full">
          {/* Product gallery */}
          <ProductGallery product={product}/>
          {/* Product info */}
          <ProductInfo product={product}/>
          {/* you may also like */}
        </div>
        
      </div>   
      <h2 className='text-left font-bold capitalize my-2'>you may also like</h2>
          <YouMayAlsoLike products={products} category={product.categories[0].toLowerCase()} productId={product._id}/>
 </div>
  )
}

export default page