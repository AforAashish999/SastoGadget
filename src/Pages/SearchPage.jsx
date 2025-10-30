import React from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/productData";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-10">
      <h1 className="text-3xl font-semibold mb-6">
        Search Results for: <span className="text-orange-500">"{query}"</span>
      </h1>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="bg-white p-4 hover:shadow-md"
            >
              <img src={product.image} alt={product.name} className="h-40 w-full object-contain" />
              <p className="mt-2 clamp-2-midword">{product.name}</p>
              <p className="text-orange-500 font-semibold mt-1">
                Rs {product.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
