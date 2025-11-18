import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailContent from "./ProductDetailContent";
import ProductAditionalInfo from "./ProductAditionalInfo";
import ProductNotFound from "./ProductNotFound";

function ViewProduct() {
  const { id } = useParams();
  const [products, setproduct] = useState("");
  const [loading, setLoading] = useState(true)

  const fetchSingleProductData = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      console.log("View product",res);
      setproduct(res.data);
    } catch (error) {
      console.log("fetching data error", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchSingleProductData();
  }, [id]);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[70vh]">
          <p className="text-gray-500 animate-pulse">Loading...</p>
        </div>
      );
    }

  return (
    <div className="p-4 md:p-16 ">
      {products ? (
        <>
          <ProductDetailContent products={products} />
          {/* details section  */}
          <ProductAditionalInfo products={products}/>
        </>
      ) : (
        <ProductNotFound /> 
      )}
    </div>
  );
}

export default ViewProduct;
