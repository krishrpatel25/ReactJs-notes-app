import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoMdCheckmark } from "react-icons/io";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

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
    }
  };

  useEffect(() => {
    fetchSingleProductData();
  }, []);

  return (
    <div className="p-16 ">
      <section>
        <div className="flex flex-col gap-6 lg:flex-row items-center  lg:items-start  bg-gradient-to-b from-gray-50 to-white ">
          {/* Thumbnails */}
          <div className="flex  border-none lg:flex-col gap-3  lg:order-1">
            {products?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`product-${index}`}
                className="bg-[#CBB3FF] p-2  border-2 border-black rounded-2xl w-20 h-20 object-cover "
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="border-none flex justify-center items-center order-1 lg:order-2">
            <div className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] flex justify-center items-center bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={products?.thumbnail}
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

      {/* details section  */}

      <section className="pt-16">
        {/* Information buttons  */}
        <Tabs defaultValue="Description" className="w-full">
          <TabsList className=" flex flex-row w-full gap-10 bg-white border-gray-300 w-full border-b-2 rounded-none">
            <TabsTrigger
              className="rounded-none text-gray-500 bg-white
               data-[state=active]:font-semibold
               data-[state=active]:text-black 
               data-[state=active]:underline 
               data-[state=active]:underline-offset-10
               data-[state=active]:decoration-black 
               data-[state=active]:decoration-2 data-[state=active]:shadow-none focus:outline-none"
              value="Description"
            >
              Description
            </TabsTrigger>

            <TabsTrigger
              className="rounded-none text-gray-500 bg-white
               data-[state=active]:font-semibold
               data-[state=active]:text-black 
               data-[state=active]:underline 
               data-[state=active]:underline-offset-10
               data-[state=active]:decoration-black 
               data-[state=active]:decoration-2 data-[state=active]:shadow-none focus:outline-none"
              value="info"
            >
              Additional Information
            </TabsTrigger>

            <TabsTrigger
              className="rounded-none text-gray-500 bg-white
               data-[state=active]:font-semibold
               data-[state=active]:text-black 
               data-[state=active]:underline 
               data-[state=active]:underline-offset-10
               data-[state=active]:decoration-black 
               data-[state=active]:decoration-2 data-[state=active]:shadow-none focus:outline-none"
              value="reviews"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* description  */}
          <div className="text-center items-center justify-center w-full py-8">
            <TabsContent value="Description" className="w-full">
              <p className="text-left text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                sed aut dolorem placeat! Recusandae, voluptate inventore
                repellat sequi, dolor quas ut tenetur perferendis voluptas
                praesentium voluptates repudiandae eius accusantium nostrum!
                Repellat ab exercitationem cum doloribus assumenda dignissimos
                hic eveniet debitis maiores, esse fuga corporis reprehenderit!
                Iusto, consequatur. Officia quibusdam eos exercitationem vitae
                eligendi libero iure aliquid voluptatibus autem, blanditiis
                adipisci.
              </p>

              <ul className="pt-4">
                <li className="pt-2">
                  <div className="flex items-center gap-4">
                    <IoMdCheckmark />
                    <span className="text-left text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quis adipisci.
                    </span>
                  </div>
                </li>
                <li className="pt-2">
                  <div className="flex items-center gap-4">
                    <IoMdCheckmark />
                    <span className="text-left text-gray-500">
                      Necessitatibus, eius laudantium maxime iste.
                    </span>
                  </div>
                </li>
                <li className="pt-2">
                  <div className="flex items-center gap-4">
                    <IoMdCheckmark />
                    <span className="text-left text-gray-500">
                      Quos corporis quibusdam assumenda eligendi non ratione.
                    </span>
                  </div>
                </li>
                <li className="pt-2">
                  <div className="flex items-center gap-4">
                    <IoMdCheckmark />
                    <span className="text-left text-gray-500">
                      Lorem ipsum dolor sit amet.
                    </span>
                  </div>
                </li>
                <li className="pt-2">
                  <div className="flex items-center gap-4">
                    <IoMdCheckmark />
                    <span className="text-left text-gray-500">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Dicta, nobis.
                    </span>
                  </div>
                </li>
                <li className="pt-2">
                  <div className="flex items-center gap-4">
                    <IoMdCheckmark />
                    <span className="text-left text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing.
                    </span>
                  </div>
                </li>
                <p className="text-left text-gray-500 pt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sequi, ex commodi? Sit perspiciatis eos officia ullam,
                  sapiente eaque! Odit aspernatur repellat nobis? Magnam
                  voluptatem at omnis, cum debitis similique dicta?
                </p>
              </ul>
            </TabsContent>

            {/* Additional Information */}
            <TabsContent value="info" className=" w-full ">
              <div className="overflow-x-auto ">
                <table className="w-full border-collapse border-2  border-gray-300 text-left">
                  <tbody className="divide-y-2 divide-gray-300">
                    <tr>
                      <td className="px-4 py-2 font-semibold">Model</td>
                      <td className="px-4 py-2">{products?.title}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Category</td>
                      <td className="px-4 py-2">{products?.category}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Color</td>
                      <td className="px-4 py-2">Black</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Weight</td>
                      <td className="px-4 py-2">{products?.weight}kg</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Dimensions</td>
                      <td className="px-4 py-2">
                        {products?.dimensions?.width} x{" "}
                        {products?.dimensions?.height} x{" "}
                        {products?.dimensions?.depth} cm
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Size</td>
                      <td className="px-4 py-2">XL, XXL, LG, SM, MD</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Warranty</td>
                      <td className="px-4 py-2">
                        {products?.warrantyInformation}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Series</td>
                      <td className="px-4 py-2">{products?.title}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Discount</td>
                      <td className="px-4 py-2">
                        {products?.discountPercentage} %
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* reviews section  */}
            <TabsContent value="reviews" className=" w-full ">
              <Carousel className="flex justify-center ">
                <CarouselContent className="flex justify-center space-x-2 ">
                  {products?.reviews?.map((review, index) => (
                    <CarouselItem key={index} className="flex justify-center  ">
                      <div className="bg-[#CBB3FF] border-2 border-black rounded-lg p-8 mb-4 max-w-3xl mx-auto ">
                        <div className="bg-white p-4  rounded-2xl flex items-center gap-3 mb-2 text-black">
                          <div className="bg-gray-200 text-left rounded-full w-10 h-10 flex items-center justify-center font-bold text-gray-700">
                            {review.rating}
                          </div>
                          <div className="ml-3">
                            <p className="font-semibold text-left">
                              {review.reviewerName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {review.reviewerEmail}
                            </p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex pt-4 items-center mb-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                            </svg>
                          ))}
                        </div>

                        {/* Comment */}
                        <p className="text-gray-700 text-left mb-2">
                          {review.comment}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="absolute left-[28rem] top-1/2 transform -translate-y-1/2" />
                <CarouselNext className="absolute right-[28rem] top-1/2 transform -translate-y-1/2" />
              </Carousel>
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </div>
  );
}

export default ViewProduct;
