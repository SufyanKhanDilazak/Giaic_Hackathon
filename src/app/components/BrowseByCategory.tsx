import Image from "next/image"
import Link from "next/link"
import { IProduct } from "./Interface"

export async function BrowseByCategories() {
  // Fetch data from Sanity
  async function SanityData() {
    try {
      const res = await fetch("https://template1-neon-nu.vercel.app/api/products")
      const data = await res.json() as IProduct[]
      // Slice to get categories (assuming first 4 are categories)
      return data.slice(13, 17)
    } catch (error) {
      console.error("Failed to fetch products:", error)
      return []
    }
  }

  // Fetch data before rendering
  const categories = await SanityData()

  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-black text-center">BROWSE BY DRESS STYLE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="relative aspect-[4/3] sm:aspect-[16/9] flex items-center justify-center">
          <Image
            src={categories[0]?.imageUrl || "/placeholder.svg"}
            alt={categories[0]?.name || "Category"}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="rounded-lg object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent rounded-lg">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">{categories[0]?.name}</h3>
            <Link href={`/category/${categories[0]?._id}`} className="text-white hover:underline">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {categories.slice(1).map((category) => (
            <div key={category._id} className="relative aspect-square flex items-center justify-center">
              <Image
                src={category.imageUrl || "/placeholder.svg"}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="rounded-lg object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent rounded-lg">
                <h3 className="text-lg font-bold mb-1 text-white">{category.name}</h3>
                <Link href={`/category/${category._id}`} className="text-white hover:underline">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}