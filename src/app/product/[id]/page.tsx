"use client"
import { client } from "@/sanity/lib/client";
import { IProduct, CartItem } from "../../../app/components/Interface"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/app/components/CartContext"; 
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

async function getProduct(id: string) {
  const query = `*[_type == "products" && _id == $id][0] {
    _id,
    name,
    price,
    description,
    "imageUrl": image.asset->url,
    "additionalImages": images[].asset->url,
    category,
    discountPercent,
    "isNew": new,
    colors,
    sizes
  }`;
  const product = await client.fetch<IProduct>(query, { id });
  return product;
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        if (!id) return;
        
        const data = await getProduct(id);
        if (!data) return;
        
        setProduct(data);
        setSelectedColor(data.colors[0]);
        setSelectedSize(data.sizes[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor
    };
    
    addToCart(cartItem);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square mb-4 max-w-[500px] mx-auto">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg object-cover"
              priority
              quality={90}
            />
          </div>
          <div className="grid grid-cols-4 gap-2 max-w-[500px] mx-auto">
            {product.additionalImages?.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square cursor-pointer hover:opacity-75 transition-opacity"
              >
                <Image
                  src={image}
                  alt={`${product.name} - ${index + 1}`}
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                  quality={85}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>
          
          {/* Color Selection */}
          <div className="space-y-2">
            <h3 className="font-medium">Color:</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-black" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <h3 className="font-medium">Size:</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md transition-colors ${
                    selectedSize === size 
                      ? "bg-black text-white border-black" 
                      : "hover:bg-gray-100 border-gray-200"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full py-6 text-lg bg-black hover:bg-gray-800 rounded-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}