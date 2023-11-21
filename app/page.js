import CategoryCards from "@/components/category-cards";
import Hero from "@/components/hero";
import ProductSlides from "@/components/product-slides";
import { lowerCase, makeCategoriesLowercase } from "@/lib/utils";
// import { seedSanityData } from "@/lib/seed";
import { client } from "@/sanity/lib/client";
import { Plus } from "lucide-react";
import { groq } from "next-sanity";
import Link from "next/link";


export default async function Home({searchParams}) {
  //seed sanity with load of data
  // await seedSanityData()  
  const {search} = searchParams
  const searchFilter = search ? `&& name match "${search}*"` : ""
  const productsFilter = `_type == "product"`

  const filter = `*[${productsFilter}${searchFilter}]`
  const products = await client.fetch(groq`${filter}`, {
    next: { revalidate: 30 },
  });

  const categories = makeCategoriesLowercase(products)
  
  const newProducts = lowerCase(products)
  const heroes = await client.fetch(
    groq`*[_type == "heroImages"]{
    images,
    detail,
    _id
  }`,
    { next: { revalidate: 30 } }
  );

  if (products.length === 0) {
    return (
      <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center dark:bg-gray-900">
        <div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
            🚫No products found...😥
          </h1>
          <Link href="/" clasName='mt-3'>
            Continue shopping
            <Plus className="ml-2 h-4 w-4" />

        </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="main gap-7 p-0">
            {search && <div className="pt-24">
              <Link href='/' className="text-lg font-semibold my-2 hover:underline text-yellow-500">clear search</Link>
              <p className="text-lg font-semibold mt-1">search results:</p>
            </div>}
      {!search && <Hero heroes={heroes}/>}
      <div className="px-6 mt-8">
      <h2 className='font-bold text-xl mt-2'>Categories</h2>
      <CategoryCards products={newProducts} newCategories={categories}/>
      </div>
      <ProductSlides products={newProducts}/>
          </main>
  )

}
