import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate()
  const [products, setproduct] = useState([]);
  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products?limit=10&skip=0"
        );
        console.log(res);
        setproduct(res.data.products);
        console.log(products);
      } catch (error) {
        console.log(error);
      }
    };
    getProductData();
  }, []);

  const handleViewProduct = (id) => {
    navigate(`/products/${id}`)
  };

  return (
    <div className="bg-[#CBB3FF] p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            onClick={() => handleViewProduct(product.id)}
            key={product.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-full h-90 overflow-hidden rounded-t-xl">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full pt-6 object-cover"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-md font-semibold text-gray-900 truncate">
                {product.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>
              <p className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>
                    {i < Math.round(product.rating) ? (
                      <img
                        className="h-[20px]"
                        src="/src/assets/star.png"
                        alt="rating star pic"
                      />
                    ) : (
                      <img
                        className="h-[20px]"
                        src="/src/assets/starEmpty.png"
                        alt="rating star pic"
                      />
                    )}
                  </span>
                ))}
              </p>

              <p className="text-gray-800 text-2xl font-bold mt-1">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
