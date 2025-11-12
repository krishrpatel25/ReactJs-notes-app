import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailContent from "./ProductDetailContent";
import ProductAditionalInfo from "./ProductAditionalInfo";
import ProductNotFound from "./ProductNotFound";

function ViewProduct() {
  const { id } = useParams();
  const [products, setproduct] = useState("");

  const fetchSingleProductData = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      console.log(res);
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
  


  return (
    <div className="p-16 ">
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
