import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoMdCheckmark } from "react-icons/io";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function ProductAditionalInfo({ products }) {
  return (
    <div>
      <section className="pt-16">
        {/* Information buttons  */}
        <Tabs defaultValue="Description" className="w-full">
          <TabsList className="w-full h-[150px]  bg-white border-gray-300 w-full border-b-2 rounded-none flex-col md: flex md:flex-row md:gap-10 md:h-[36px] ">
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
          <div className="w-full py-6">
            {/* Description */}
            <TabsContent value="Description" className="w-full">
              <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                sed aut dolorem placeat!
              </p>

              <ul className="pt-4 flex flex-col gap-3">
                {[
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis adipisci.",
                  "Necessitatibus, eius laudantium maxime iste.",
                  "Quos corporis quibusdam assumenda eligendi non ratione.",
                  "Lorem ipsum dolor sit amet.",
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, nobis.",
                  "Lorem ipsum, dolor sit amet consectetur adipisicing.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-500 text-sm sm:text-base"
                  >
                    <IoMdCheckmark className="mt-1 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            {/* Additional Information */}
            <TabsContent value="info" className="w-full">
              <div className="w-full overflow-visible">
                <table className="w-full table-auto border-collapse border-2 border-gray-300 text-left text-sm sm:text-base">
                  <tbody className="divide-y-2 divide-gray-300">
                    <tr>
                      <td className="px-2 sm:px-4 py-2 font-semibold break-words">
                        Model
                      </td>
                      <td className="px-2 sm:px-4 py-2 break-words">
                        {products?.title}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 sm:px-4 py-2 font-semibold break-words">
                        Category
                      </td>
                      <td className="px-2 sm:px-4 py-2 break-words">
                        {products?.category}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 sm:px-4 py-2 font-semibold break-words">
                        Color
                      </td>
                      <td className="px-2 sm:px-4 py-2 break-words">Black</td>
                    </tr>
                    <tr>
                      <td className="px-2 sm:px-4 py-2 font-semibold break-words">
                        Weight
                      </td>
                      <td className="px-2 sm:px-4 py-2 break-words">
                        {products?.weight}kg
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 sm:px-4 py-2 font-semibold break-words">
                        Dimensions
                      </td>
                      <td className="px-2 sm:px-4 py-2 break-words">
                        {products?.dimensions?.width} x{" "}
                        {products?.dimensions?.height} x{" "}
                        {products?.dimensions?.depth} cm
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 sm:px-4 py-2 font-semibold break-words">
                        Size
                      </td>
                      <td className="px-2 sm:px-4 py-2 break-words">
                        XL, XXL, LG, SM, MD
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 sm:px-4 py-2 font-semibold break-words">
                        Warranty
                      </td>
                      <td className="px-2 sm:px-4 py-2 break-words">
                        {products?.warrantyInformation}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 sm:px-4 py-2 font-semibold break-words">
                        Series
                      </td>
                      <td className="px-2 sm:px-4 py-2 break-words">
                        {products?.title}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 sm:px-4 py-2 font-semibold break-words">
                        Discount
                      </td>
                      <td className="px-2 sm:px-4 py-2 break-words">
                        {products?.discountPercentage} %
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews" className="w-full">
              <Carousel className="flex justify-center overflow-x-auto ">
                <CarouselContent className="flex  space-x-2">
                  {products?.reviews?.map((review, index) => (
                    <CarouselItem
                      key={index}
                      className="flex justify-center w-[250px] sm:w-[200px] xs:w-[150px] flex-shrink-0"
                    >
                      <div className="bg-[#CBB3FF] border-2 border-black rounded-lg p-2 sm:p-6 md:p-8 mb-4 max-w-full mx-auto">
                        <div className="bg-white p-3 sm:p-4 rounded-2xl flex items-center gap-3 mb-2 text-black">
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
                        <div className="flex pt-2 sm:pt-4 items-center mb-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg
                              key={i}
                              className={`w-4 sm:w-5 h-4 sm:h-5 ${
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
                        <p className="text-gray-700 text-left mb-2 text-sm sm:text-base">
                          {review.comment}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="absolute left-0  md:left-10 lg:left-50 xl:left-100 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition z-10">
                  &lt;
                </CarouselPrevious>

                <CarouselNext className="absolute right-0  md:right-10 lg:right-50 xl:right-100 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition z-10">
                  &gt;
                </CarouselNext>
              </Carousel>
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </div>
  );
}

export default ProductAditionalInfo;
