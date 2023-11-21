import React from 'react'
import  CartItems  from "@/components/cart-items"
import  CartSummary  from "@/components/cart-summary"
import MiniNav from '@/components/mini-nav';

const page = () => {
  
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "cart", link: "/cart" },
  ];
  return (
    <div>
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-28 sm:px-6 lg:max-w-7xl lg:px-8">
    <MiniNav links={miniLinks} />

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Shopping Cart
      </h1>

      <form className="mt-12 relative gap-3 flex lg:flex-row flex-col w-full justify-between">
        <section aria-labelledby="cart-heading" className="w-3/4 mx-auto lg:mx-0 lg:w-3/4">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>
          <CartItems/>
        </section>
        {/* Cart Summary */}
        <CartSummary/>
      </form>
    
    </main>
  </div>  )
}

export default page