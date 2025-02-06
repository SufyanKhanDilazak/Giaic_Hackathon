import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NewArrivals } from "./components/NewArrivals"
import { TopSelling } from "./components/TopSelling"
import { BrowseByCategories } from "./components/BrowseByCategory"
import ReviewsSection from "./components/Reviews"

export default function Home() {
  return (
    <div className="container mx-auto px-1 sm:px-1 lg:px-1 py-8 space-y-12 sm:space-y-8">
      {/* Hero Section */}
      <section className="bg-gray-100 text-gray-950 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 p-4 md:p-8 space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-md">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your
              individuality and cater to your sense of style.
            </p>
            <Button
              variant="secondary"
              className="bg-black text-white rounded-full px-8 sm:px-16 py-3 hover:bg-gray-900"
            >
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src="/picc.png"
              alt="Hero Image"
              width={600}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Brand Logos Section */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-7 bg-black py-6 sm:py-8 px-4 sm:px-12 items-center justify-items-center rounded-xl">
  {["gucci.png", "prada.png", "versace.png", "zara.png", "calvin.png"].map((brand) => (
    <div key={brand} className="w-16 sm:w-24 h-8 sm:h-12 flex items-center justify-center">
      <Image
        src={`/logos/${brand}`}
        alt={`${brand.replace('.png', '')} logo`}
        width={96}
        height={48}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  ))}
</div>

      {/* New Arrivals Section */}
      <NewArrivals />

      {/* Top Selling Section */}
      <TopSelling />

      {/* Browse by Style Section */}
      <BrowseByCategories/>

      {/* Reviews Section */}
      <ReviewsSection />
    </div>
  )
}

