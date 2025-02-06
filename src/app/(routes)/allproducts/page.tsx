import Image from "next/image";
import Link from "next/link";
import { IProduct } from "../../components/Interface";

// Fetch data from Sanity
async function fetchSanityData() {
  try {
    const res = await fetch("https://template1-neon-nu.vercel.app/api/products");
    const data = (await res.json()) as IProduct[];
    return data.slice(1, 17);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

const AllProducts = async () => {
  const topSelling = await fetchSanityData();

  return (
    <section className="text-center">
      <h2 className="text-2xl md:text-3xl font-black mb-10 mt-10">All Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
        {topSelling.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id} className="group">
            <div className="relative aspect-[2/3] mb-3 w-3/4 mx-auto">
              <Image
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 25vw, 15vw"
                className="rounded-lg group-hover:opacity-75 transition-opacity object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-900">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
