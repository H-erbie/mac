import MiniNav from '@/components/mini-nav';
import Img from '@/components/ui/image';
import { lowerCase } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { groq } from 'next-sanity';
import Link from 'next/link';
import React from 'react'

const Page = async({ params }) => {
    const products = await client.fetch(groq`*[_type == "product"]`, {
        next: { revalidate: 30 },
      });
      const { category } = params;
      const newParams = decodeURIComponent(category);
      
  const newProducts = lowerCase(products)
  const categoryProducts =newProducts.filter(product => product.categories.includes(newParams));
  
  const miniLinks = [
    { text: "home", link: "/" },
    { text: newParams, link: "" },
  ];
  return (
    <div className='main pt-24'>
          <MiniNav links={miniLinks} />

              <h2 className="text-3xl font-bold my-4 tracking-tight sm:text-4xl">{newParams}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-10 w-full mx-auto">
        {categoryProducts.map((product) => (
          <Link href={`/products/${product.slug.current}`}  key={product._id}>
          <div className=" w-full  overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
            <Img
              src={urlForImage(product.images[0]).url()}
              width={100}
              height={100}
              alt={product.name}
               cls={'hover:opacity-[0.8] h-34'} 
            />
                      </div>

            <p className="text-center mt-2">{product.name}</p>
          </Link>
        ))}
        
      </div>
    </div>
  )
}

export default Page