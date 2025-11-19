import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { FaWindowClose } from "react-icons/fa";

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// ----------------------- PAGINATION COMPONENT -----------------------
function PaginationComponent({ page, setPage, totalPages }) {
  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(page - 1)} />
          </PaginationItem>
        )}

        {/* If total pages are small, show all */}
        {totalPages <= 4 ? (
          Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          <>
            {/* First Page */}
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === 1}
                onClick={() => setPage(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {/* Left Ellipsis */}
            {page > 3 && totalPages > 5 && <PaginationEllipsis />}

            {/* Middle Pages */}
            {Array.from({ length: 3 }, (_, i) => {
              const pageNum = page - 1 + i;
              if (pageNum <= 1 || pageNum >= totalPages) return null;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageNum}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Right Ellipsis */}
            {page < totalPages - 2 && totalPages > 5 && <PaginationEllipsis />}

            {/* Last Page */}
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === totalPages}
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next Button */}
        {page < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => setPage(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

// ----------------------- DROPDOWN COMPONENT -----------------------
const frameworks = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "40", label: "40" },
  { value: "50", label: "50" },
  { value: "60", label: "60" },
];

function DropDown({ value, setValue }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-[300px] items-center gap-2">
      <Popover open={open} onOpenChange={setOpen} className="p-6">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[80px] justify-between"
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
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(
                        currentValue === value ? `${value}` : currentValue
                      );
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

      <div>
        <h1 className="font-semibold ">Product per page</h1>
      </div>
    </div>
  );
}

// ----------------------- PRODUCTS COMPONENT -----------------------
function Products() {
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState(""); // first search filter
  const [apiSearch, setApiSearch] = useState(""); //second search filter

  const getProductData = async (limit) => {
    try {
      const skip = (page - 1) * limit;
      const res = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );

      const total = res.data.total;
      const newTotalPages = Math.ceil(total / limit);
      setTotalPages(newTotalPages);

      if (page > newTotalPages) {
        setPage(newTotalPages);
        return; // wait for useEffect to refetch
      }

      setProduct(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApiSearch = async (value) => {
    try {
      if (!value || value.trim() === "") return;

      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${value}`
      );

      setProduct(res.data.products);
      setTotalPages(Math.ceil(res.data.total / limit));
      setPage(1);
    } catch (err) {
      console.log(err);
    }
  };
  const debouncedSearch = useCallback(
    debounce((value) => fetchApiSearch(value), 500),
    []
  );

  useEffect(() => {
    getProductData(limit);
  }, [limit, page]);

  useEffect(() => {
    debouncedSearch(apiSearch);
  }, [apiSearch]);

  const handleViewProduct = (id) => navigate(`/products/${id}`);

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);
      toast.success("Product deleted successfully!");
      setProduct((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      toast.error("Failed to delete product!");
    }
  };

  if (loading) {
    return (
      <div class="h-screen flex items-center justify-center">
        <div class="w-32 h-32 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (product) =>
      product.title?.toLowerCase().includes(search.toLowerCase()) ||
      product.description
        ?.toLowerCase()
        .includes(
          search.toLowerCase() ||
            product.category?.toLowerCase().includes(search.toLowerCase())
        )
  );

  function handleClear() {
    setSearch("");
  }

  function handleClearApi() {
    setApiSearch("");
    getProductData(limit);
  }

  return (
    <div className="bg-[#CBB3FF] py-6 px-20 min-h-screen">
      <div className="flex items-center justify-center py-6">
        <span className="block w-full h-[2px] bg-black"></span>

        <h1 className="text-3xl font-bold mx-4 text-gray-800">Products</h1>

        <span className="block w-full h-[2px] bg-black"></span>
      </div>

      {/* search bars */}
      <div className="flex w-full gap-4 py-4  rounded-2xl  ">
        <div className="flex w-full items-center gap-3  bg-white rounded-2xl shadow-lg px-4 py-3 border border-gray-300  ">
          {/* Search Icon (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5  text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 border-0 focus:ring-0  focus:outline-none text-base"
            value={apiSearch}
            onChange={(e) => setApiSearch(e.target.value)}
          />

          {apiSearch && (
            <button
              onClick={handleClearApi}
              className="text-red-500 hover:text-red-600 transition"
            >
              {/* Close Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Box */}
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-2xl border border-gray-300 ">
          {/* Filter Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 018 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>

          <input
            type="text"
            placeholder="Filter..."
            className="flex-1 border-0 focus:ring-0 focus:outline-none text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              onClick={handleClear}
              className="text-red-500 hover:text-red-600 transition"
            >
              {/* Close Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleViewProduct(product.id)}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                {/* Category Badge on Image (Glossy) */}
                <span
                  className="absolute top-3 left-3 text-xs font-medium text-purple-700 
      bg-white/40 backdrop-blur-md border border-white/50 
      px-3 py-1 rounded-full shadow-sm"
                >
                  {product.category}
                </span>

                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full object-contain p-4"
                />
              </div>

              {/* Text Content */}
              <div className="p-5 flex flex-col gap-3">
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {product.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <img
                      key={i}
                      src={
                        i < Math.round(product.rating)
                          ? "/src/assets/star.png"
                          : "/src/assets/starEmpty.png"
                      }
                      className="h-[18px]"
                      alt="star"
                    />
                  ))}

                  <span className="text-gray-500 text-sm ml-1">
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                {/* Price + Delete */}
                <div className="flex justify-between items-center pt-2">
                  <p className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(product.id);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[392px] pt-29 text-center items-center ">
          <h1>No product found!! try on another page!!</h1>
        </div>
      )}

      {/* Dropdown and Pagination */}
      <div className="flex justify-between items-center py-6">
        <DropDown value={limit} setValue={setLimit} />
        <PaginationComponent
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default Products;
