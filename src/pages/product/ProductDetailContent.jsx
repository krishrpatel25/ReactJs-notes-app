import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function ProductDetailContent({ products }) {
  const [selectImage, setSelectImage] = useState(products?.thumbnail || "");
  return (
    <div>
      <section>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 bg-gradient-to-b to-white p-4 lg:p-0">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 lg:order-1 overflow-x-auto lg:overflow-x-visible">
            {products?.images ? (
              products.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`product-${index}`}
                  className="bg-[#CBB3FF] hover:bg-[#dacafc] p-2 border-2 border-black rounded-2xl w-16 h-16 sm:w-20 sm:h-20 object-cover cursor-pointer flex-shrink-0"
                  onClick={() => setSelectImage(img)}
                />
              ))
            ) : (
              <div className="flex justify-center items-center py-10">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Main Image */}
          <div className="border-none flex justify-center items-center order-1 lg:order-2 w-full lg:w-auto">
            <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] flex justify-center items-center rounded-2xl overflow-hidden">
              <img
                src={selectImage}
                alt={products?.title}
                className="w-full h-full object-contain transition-all duration-300"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col p-4 sm:p-6 lg:p-8 gap-4 w-full lg:w-[60%] order-3 bg-[#CBB3FF] border-2 border-black rounded-2xl">
            <span className="text-sm sm:text-base text-gray-700">
              {products?.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {products?.title}
            </h1>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {products?.description}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                Stock: {products?.stock}
              </span>
            </div>

            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              ${products?.price}
            </p>
            <div className="w-full pt-4">
              <Button className="w-full sm:w-auto">Add Cart</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailContent;
