import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const ProductNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b  to-white text-center px-6">
      {/* Icon */}
      <div className="bg-red-100 p-6 rounded-full mb-6">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>

      {/* Message */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
        No Product Found
      </h1>
      <p className="text-gray-600 max-w-md mb-6">
        We could not find any product matching your search. Please try again or
        explore other categories.
      </p>


    </div>
  );
};

export default ProductNotFound;
