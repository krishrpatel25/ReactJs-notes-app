import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
("use client");

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Products() {
  const navigate = useNavigate();
  const [products, setproduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductData = async () => {
    try {
      const res = await axios.get(
        "https://dummyjson.com/products?limit=4&skip=0"
      );
      console.log("all product", res);
      setproduct(res.data.products);
      console.log(products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleViewProduct = (id) => {
    navigate(`/products/${id}`);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`https://dummyjson.com/products/${id}`);
      console.log("Deleted product", res);
      toast.success("Product delete sucessfuly!");
      setproduct((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.log(error);
      toast.fail("Product delete sucessfuly!");
    } finally {
      setLoading(false);
    }

    if (products.length === 0) {
      toast.fail("No products left!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {products.length === 0 ? (
        <div className="flex items-center justify-center p-6 min-h-screen bg-[#CBB3FF]">
          <h1 className="text-xl font-semibold text-gray-700">
            No products left!
          </h1>
        </div>
      ) : (
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

                  <div className="flex justify-between items-center">
                    <p className="text-gray-800 text-2xl font-bold mt-1">
                      ${product.price}
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation(); ///
                        handleDeleteProduct(product.id);
                      }}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* pagination  */}

          <div className=" flex justify-between items-center">
            <DropDown />
            <div className="pt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;

const frameworks = [
  {
    value: "10",
    label: "10",
  },
  {
    value: "20",
    label: "20",
  },
  {
    value: "30",
    label: "30",
  },
  {
    value: "40",
    label: "40",
  },
  {
    value: "50",
    label: "50",
  },
];

export function DropDown() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("10");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[60px] justify-between"
        >
          {value}

          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[80px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  className="w-[80px]"
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
