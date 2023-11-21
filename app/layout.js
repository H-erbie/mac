import { siteConfig } from "@/config/site";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import { fontSans } from "@/lib/font";
import SiteFooter from "@/components/site-footer";
import { Providers } from "@/components/providers";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { makeCategoriesLowercase } from "@/lib/utils";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "./favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  const products = await client.fetch(groq`*[_type == "product"]`, {
    next: { revalidate: 30 },
  });

//   const siteInfos = await client.fetch(groq`*[_type == "siteInfo"]`, {
//     next: { revalidate: 30 },
//   });

  const categories = makeCategoriesLowercase(products)
  return (
    <html lang="en">
      <body className={fontSans.variable}>
        <Providers>
          <SiteHeader categories={categories}/>
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
