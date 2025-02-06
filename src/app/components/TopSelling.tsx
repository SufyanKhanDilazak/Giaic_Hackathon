import Image from "next/image"
import Link from "next/link"
import { IProduct } from "./Interface"
import { client } from "@/sanity/lib/client" 

export async function TopSelling() {
  const query = `*[_type == "products"] | order(price desc)[8...12] {
    _id,
    name,
    price,
    "imageUrl": image.asset->url,
    category,
    discountPercent,
    "isNew": new
  }`

  const products = await client.fetch<IProduct[]>(query)

  return (
    <section className="text-center">
      <h2 className="text-2xl md:text-3xl font-black mb-6 mt-48">TOP SELLING</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id} className="group">
            <div className="relative aspect-[3/4] mb-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="rounded-lg group-hover:opacity-75 transition-opacity object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-900">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}