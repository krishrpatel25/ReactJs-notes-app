import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    getProductData(limit);
  }, [limit, page]);

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
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (product) =>
      product.title?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase() ||
      product.category?.toLowerCase().includes(search.toLowerCase())
    )
  );

  
  function handleClear() {
    setSearch("");
  }

  function handleClearApi() {
    setApiSearch("");
  }

  return (
    <div className="bg-[#CBB3FF] py-6 px-20 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Products
        </h1>
      </div>
      {/* search bars */}

      {/* first search btn */}
      <div className="flex justify-end gap-2 p-2">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="filter"
            className="bg-white border-2 border-black focus:border-g"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.length > 0 && (
            <Button
              onClick={handleClear}
              className="bg-red-600 hover:bg-red-600 "
            >
              <FaWindowClose className=" text-white" />
            </Button>
          )}
        </div>

        {/* second search btn */}
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Search API (debounced)"
            className="bg-white border-2 border-black focus:border-g"
            value={apiSearch}
            onChange={(e) => setApiSearch(e.target.value)}
          />
          {apiSearch && (
            <Button className="bg-red-600" onClick={handleClearApi}>
              <FaWindowClose className="text-white" />
            </Button>
          )}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleViewProduct(product.id)}
              className="bg-white  shadow-md  border-gray-200 hover:shadow-xl transition-all transform "
            >
              <div className="w-full h-50 flex justify-center items-center overflow-hidden object-cover rounded-t-xl">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-50 h-50 pt-6 object-cover"
                />
              </div>
              <div className="p-6 flex flex-col gap-2">
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
                          alt="star"
                        />
                      ) : (
                        <img
                          className="h-[20px]"
                          src="/src/assets/starEmpty.png"
                          alt="empty star"
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
                      e.stopPropagation();
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
