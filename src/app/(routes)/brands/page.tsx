// pages/brands.tsx
import { FC } from "react";
import Image from "next/image";

const BrandsPage: FC = () => {
  return (
    <main className="py-16 bg-gray-50">
      {/* Header Section */}
      <section className="text-center px-8 mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Trusted Brands</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We collaborate with industry-leading brands to bring you the best products and services.
        </p>
      </section>

      {/* Logos Section */}
      <section className="flex flex-wrap justify-center items-center gap-8 max-w-5xl mx-auto px-4">
        {["/gucci.png", "/prada.png", "/calvin.png", "/zara.png", "/versace.png"].map((logo, index) => (
          <div
            key={index}
            className="bg-black shadow-md rounded-lg p-6 flex items-center justify-center w-40 h-40 hover:shadow-lg transition-shadow"
          >
            <Image
              src={logo} // Correct path referencing images in public folder
              alt={`Brand ${index + 1}`}
              width={120}
              height={80}
              className="object-contain"
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default BrandsPage;
