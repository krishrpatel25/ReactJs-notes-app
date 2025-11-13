import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

function ProductDetailContent({ products }) {
  const [selectImage, setSelectImage] = useState(products?.thumbnail || "");
  return (
    <div>
      <section>
        <div className="flex flex-col gap-6 lg:flex-row items-center  lg:items-start  bg-gradient-to-b  to-white ">
          {/* Thumbnails */}
          <div className="flex border-none lg:flex-col gap-3 lg:order-1">
            {products?.images ? (
              products.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`product-${index}`}
                  className="bg-[#CBB3FF] hover:bg-[#dacafc] p-2 border-2 border-black rounded-2xl w-20 h-20 object-cover cursor-pointer"
                  onClick={() => setSelectImage(img)}
                />
              ))
            ) : (
                
              <p>Loading...</p>
            )}
          </div>

          {/* Main Image */}
          <div className="border-none flex justify-center items-center order-1 lg:order-2">
            <div className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] flex justify-center items-center rounded-2xl overflow-hidden">
              <img
                src={selectImage}
                alt={products?.title}
                className="w-full h-full object-contain transition-all duration-300"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col p-8 h-[350px] sm:h-[400px] gap-4 w-[70%] order-3 bg-[#CBB3FF] border-2 border-black rounded-2xl">
            <span>{products?.category}</span>
            <h1 className="text-3xl font-bold text-gray-800">
              {products?.title}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {products?.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Stock: {products?.stock}
              </span>
            </div>

            <p className="text-3xl font-extrabold text-white mt-2">
              ${products?.price}
            </p>
            <div className="w-full pt-4">
              <Button>Add Cart</Button>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default ProductDetailContent