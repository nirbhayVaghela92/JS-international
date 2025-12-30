"use client"

import Image from "next/image"
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { FiArrowLeft, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { useRef, useState } from "react"
import Button from "@/components/common/Button"
import SectionHeading from "@/components/common/SectionHeading"
import ProductCard from "@/components/common/ProductCard"
import FaqSection from "@/components/sections/FaqSection"
import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { HiOutlineCalendar } from "react-icons/hi"
import VideoSection from "@/components/sections/VideoSection"

const banners = [
  {
    id: 1,
    image: "/images/banner-1.png"
  },
  {
    id: 2,
    image: "/images/banner-1.png"
  },
  {
    id: 3,
    image: "/images/banner-1.png"
  },
]

const categories = [
  {
    id: 1,
    title: "Watch for Men",
    image: "/images/category/men-watch.png",
    link: "/category/men-watches",
  },
  {
    id: 2,
    title: "Watch for Women",
    image: "/images/category/women-watches.png",
    link: "/category/women-watches",
  },
  {
    id: 3,
    title: "Purses",
    image: "/images/category/purse.png",
    link: "/category/purses",
  },
  {
    id: 4,
    title: "Jewellery",
    image: "/images/category/jewellery.png",
    link: "/category/jewellery",
  },
]


const products = [
  {
    id: 1,
    image: "/images/products/earrings.png",
    title: "Lillypearlie Women's Miscellaneous Earrings",
    code: "CW15006",
    price: "800",
    oldPrice: "1,999",
  },
  {
    id: 2,
    image: "/images/products/watch-blue-dial.png",
    title: "Quadrus Watch Steel, Blue, Silver Colour",
    code: "CB13309",
    price: "14,199",
    oldPrice: "15,399",
  },
  {
    id: 3,
    image: "/images/products/black-bag.png",
    title: "Sacroisé Crossbody Bag, Black, Gold Colour",
    code: "CB13309",
    price: "2,499",
    oldPrice: "2,999",
  },
  {
    id: 4,
    image: "/images/products/black-watch.png",
    title: "Anthéor Multifunction Watch Leather Blue, Rose Gold",
    code: "CB13309",
    price: "9,899",
    oldPrice: "10,399",
  },
  {
    id: 5,
    image: "/images/products/silver-watch.png",
    title: "Lillypearlie Women's Miscellaneous Earrings",
    code: "CW15006",
    price: "800",
    oldPrice: "1,999",
  },
  {
    id: 6,
    image: "/images/products/watch-steel.png",
    title: "Quadrus Watch Steel, Blue, Silver Colour",
    code: "CB13309",
    price: "14,199",
    oldPrice: "15,399",
  },
  {
    id: 7,
    image: "/images/products/bracelet.png",
    title: "Sacroisé Crossbody Bag, Black, Gold Colour",
    code: "CB13309",
    price: "2,499",
    oldPrice: "2,999",
  },
  {
    id: 8,
    image: "/images/products/leather-watch.png",
    title: "Anthéor Multifunction Watch Leather Blue, Rose Gold",
    code: "CB13309",
    price: "9,899",
    oldPrice: "10,399",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Mike Hussey.,",
    location: "From Canada",
    rating: 4.5,
    text: "I’ve been shopping online for years, but this was one of the best experiences I’ve had. The quality of the products is exceptional, and the attention to detail really impressed me. Everything arrived beautifully packaged and on time. I’m genuinely happy with my purchase and will definitely recommend it to friends.",
    image: "images/users/user-1.png",
  },
  {
    id: 2,
    name: "Emily R.,",
    location: "New York",
    rating: 4.5,
    text: "I was looking for something stylish yet comfortable, and this brand delivered exactly that. The designs feel premium, and the craftsmanship is top-notch. What stood out the most was how thoughtfully everything was curated. It’s rare to find quality and affordability together—this brand nails both.",
    image: "images/users/user-2.png",
  },
  {
    id: 3,
    name: "Jessica L.,",
    location: "Texas",
    rating: 4.5,
    text: "My experience from browsing to checkout was incredibly smooth. The customer support team was responsive and helped me choose the right product without any hassle. When my order arrived, I was amazed by the quality and finishing. It truly felt like a high-end purchase at a great price.",
    image: "images/users/user-3.png",
  },
]


const blogs = [
  {
    id: 1,
    image: "/images/blogs/blog-1.png",
    date: "November 6, 2025",
    title:
      "Styling Tips: How to Wear Designer Jewellery for Every Occasion",
    link: "/blogs/styling-tips",
  },
  {
    id: 2,
    image: "/images/blogs/blog-2.png",
    date: "November 6, 2025",
    title:
      "Luxury on a Budget: Best Affordable Designer Handbags",
    link: "/blogs/luxury-on-budget",
  },
  {
    id: 3,
    image: "/images/blogs/blog-3.png",
    date: "November 6, 2025",
    title:
      "How Luxury Jewellery Brands Are Embracing Sustainability",
    link: "/blogs/sustainability",
  },
]

const products2 = [
  {
    id: 1,
    image: "/images/products2/p1.png",
    title: "Belisenna Watch Double Leather, Mocha, Gold Colour",
    code: "CW15006",
    price: "12,499",
    oldPrice: "14,499",
  },
  {
    id: 2,
    image: "/images/products2/p2.png",
    title: "Essentielle Snake Bracelet Gold Colour",
    code: "CB13309",
    price: "8,599",
    oldPrice: "9,199",
  },
  {
    id: 3,
    image: "/images/products2/p3.png",
    title: "Sacrosié Crossbody Bag, Black, Gold Colour",
    code: "CB13309",
    price: "2,499",
    oldPrice: "2,999",
  },
  {
    id: 4,
    image: "/images/products2/p4.png",
    title: "Gracieuse Petite Watch Steel, White, Gold Colour",
    code: "CB13309",
    price: "9,899",
    oldPrice: "10,399",
  },
  {
    id: 5,
    image: "/images/products2/p5.png",
    title: "Essentielle Round Hoop Earring Gold Colour",
    code: "CB13309",
    price: "15,899",
    oldPrice: "16,499",
  },
  {
    id: 6,
    image: "/images/products2/p1.png",
    title: "Belisenna Watch Double Leather, Mocha, Gold Colour",
    code: "CW15006",
    price: "12,499",
    oldPrice: "14,499",
  },
]

const items = [
    {
      id: 1,
      title: "Cash On Delivery",
      desc: "Shop worry-free and pay only when your order arrives.",
      icon: "/images/icons/cod.png",
    },
    {
      id: 2,
      title: "10000+ Happy Customer",
      desc: "Trusted by thousands of satisfied shoppers worldwide.",
      icon: "/images/icons/happy.png",
    },
    {
      id: 3,
      title: "Worldwide Shipping",
      desc: "Delivering your favorites to your doorstep, wherever you are.",
      icon: "/images/icons/shipping.png",
    },
    {
      id: 4,
      title: "Handmade with Love",
      desc: "Each piece crafted carefully with passion and care.",
      icon: "/images/icons/handmade.png",
    },
  ]

export default function HomePage() {
    const router = useRouter();
   const carouselRef = useRef(null)
    const duplicatedTestimonials = [...testimonials, ...testimonials]

    const [api, setApi] = useState(null)
    const [canPrev, setCanPrev] = useState(false)
    const [canNext, setCanNext] = useState(true)

    const onInit = (embla) => {
      setApi(embla)
      setCanPrev(embla.canScrollPrev())
      setCanNext(embla.canScrollNext())

      embla.on("select", () => {
        setCanPrev(embla.canScrollPrev())
        setCanNext(embla.canScrollNext())
      })
    }
  return (
    <main className="pt-[46px]">


      {/* Banner Start Here */}

      <div className="relative w-full overflow-hidden">
        <Carousel
        opts={{ align: "start", loop: true }}
        setApi={(api) => (carouselRef.current = api)}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              {/* 🔥 Background Image Banner */}
              <main
                className="h-screen w-full bg-cover bg-left sm:bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${banner.image})` }}
              >

                
                <div className="cus-container flex h-full items-center">
                  <div className="text-center md:text-left">
                    <h2 className="font-bold text-[35px] sm:text-[50px] md:text-[94px] leading-[70px] md:leading-[114px] text-white font-serif">
                      Crafted for Those <br />
                      <span className="text-[#E7B250]"> Who Value Time</span>
                    </h2>
                    <p className="text-[18px] md:text-[24px] leading-[1.5] text-white">Premium watch designs built with elegance and durability to complement your personal style.</p>
                    <Button textColor="text-[#0f4a45]" bgColor="bg-[#E7B250]" className="uppercase mt-5 px-[30px]">
                      Discover New Arrivals
                    </Button>

                  </div>
                </div>
               
              </main>
              
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

        {/* Left Arrow */}
          <button
          onClick={() => carouselRef.current?.scrollPrev()}
            // disabled={!canPrev}
            className={`
              absolute top-[45%] left-[20px] z-5
              flex w-10 h-10 md:h-14 md:w-14 items-center justify-center
              transition bg-[#E7B250]
            `}
          >
            <FiArrowLeft className="text-2xl text-white" />
          </button>

          {/* Right Arrow */}
          <button
          onClick={() => carouselRef.current?.scrollNext()}
            // disabled={!canNext}
            className={`
              absolute top-[45%] right-[20px] z-5
              flex w-10 h-10 md:h-14 md:w-14 items-center justify-center
              transition bg-[#E7B250]
            `}
          >
            <FiArrowRight className="text-2xl text-white" />
          </button>


      </div>

      
      {/* Catergory Section Start Here */}

       <section className=" py-28">
        <div className="cus-container">          
          {/* Heading */}
          <SectionHeading
            title="Shop by Category"
            subtitle="Choose a category and start shopping your way."
          />

          {/* Grid */}
          <div className="mt-16 grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => (
              <div
                key={item.id}
                className="relative h-[420px] overflow-hidden"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Button */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%]">
                  <Button
                    href={item.link}
                    bgColor="bg-white"
                    textColor="text-[#094745]"
                    px="px-6"
                    py="py-3"
                    fontSize="text-base"
                    className="w-full rounded-none"
                    onClick={() => router.push("/product")}
                  >
                    {item.title}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      <section className="bg-white py-28 relative">
        {/* Heading */}
        <SectionHeading
          title="Best Sellers"
          subtitle="Our most-loved pieces, chosen by customers for their style, quality, and timeless appeal."
        />

        {/* Carousel */}
        <div className="relative mt-16">
          <Carousel
            opts={{ align: "start", loop: false }}
            setApi={onInit}
          >
            <CarouselContent className="-ml-6">
              {products2.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-[20%]"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Left Arrow */}
          <button
            onClick={() => api?.scrollPrev()}
            disabled={!canPrev}
            className={`
              absolute top-[35%] left-[20px] z-10
              flex h-14 w-14 items-center justify-center
              transition
              ${canPrev ? "bg-[#E7B250]" : "bg-[#1B1918] cursor-not-allowed"}
            `}
          >
            <FiArrowLeft className="text-2xl text-white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => api?.scrollNext()}
            disabled={!canNext}
            className={`
              absolute top-[35%] right-[20px] z-10
              flex h-14 w-14 items-center justify-center
              transition
              ${canNext ? "bg-[#E7B250]" : "bg-[#1B1918] cursor-not-allowed"}
            `}
          >
            <FiArrowRight className="text-2xl text-white" />
          </button>
        </div>
      </section>


      <section>
        <div className="cus-container">
          <div className="flex flex-col gap-[14px] md:flex-row">
            <Image
              src="/images/offer/offer-1.png"
              width={878}
              height={770}
              alt="offer"
              className="w-full h-auto max-w-[878px]"
             />
            <Image
              src="/images/offer/offer-2.png"
              width={737}
              height={770}
              alt="offer"
              className="w-full h-auto max-w-[737px]"
             />
          </div>
        </div>
      </section>


      {/* What's New Section Start Here */}

      <section className="py-20">
        <div className="cus-container">

          <SectionHeading
            title="What’s New!"
            subtitle="Explore new arrivals crafted for your everyday look."
          />

          {/* Products Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>
      

      <VideoSection />



      <section className="py-10">
        <div className="cus-container">
          {/* OUTER BORDER */}
          <div className="border border-[#E7B250]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative">

              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="relative flex justify-center"
                >
                  {/* VERTICAL DIVIDER */}
                  {index !== items.length - 1 && (
                    <span
                      className="
                        hidden lg:block
                        absolute right-0 top-1/2
                        h-[70%] w-px
                        -translate-y-1/2
                        bg-[#E7B250]
                      "
                    />
                  )}

                  {/* CONTENT */}
                  <div className="flex flex-col items-center px-6 py-12 text-center">
                    {/* Icon */}
                    <div className="mb-4">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="h-[76px] w-[76px] object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h4 className="mb-2 text-[24px] font-semibold text-[#094745]">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="text-[16px] leading-relaxed text-[#9B9B9B]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      <section className="py-[100px]">
        <div className="cus-container">
          <SectionHeading title={'People in JS International'} subtitle={'Unmatched design—superior performance and customer satisfaction in one.'} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="text-center bg-[#F6EDDB] pb-[27px]">
              <Image src="/images/international/watch-1.png" width={344} height={344} alt="watch" className="mx-auto" />
              <h4 className="text-[32px] mb-[15px]">Watches</h4>
              <Button className="w-full mx-auto max-w-[365px]">Discover</Button>
            </div>
            <div className="text-center bg-[#F6EDDB] pb-[27px]">
              <Image src="/images/international/purse.png" width={344} height={344} alt="purse" className="mx-auto" />
              <h4 className="text-[32px] mb-[15px]">Purses</h4>
              <Button className="w-full mx-auto max-w-[365px]">Discover</Button>
            </div>
            <div className="text-center bg-[#F6EDDB] pb-[27px]">
              <Image src="/images/international/ring.png" width={344} height={344} alt="ring" className="mx-auto" />
              <h4 className="text-[32px] mb-[15px]">Jewellery</h4>
              <Button className="w-full mx-auto max-w-[365px]">Discover</Button>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonial Start Here */}


      <section className="py-16 overflow-hidden bg-background">
        <SectionHeading
              title="Customer Say!"
              subtitle="Real reviews from parents who trust and love our brand."
            />

        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="flex gap-6 animate-infinite-scroll hover:[animation-play-state:paused]">
            {duplicatedTestimonials.map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${index}`}
                className="relative text-center md:text-left flex-shrink-0 w-[622px] p-8 bg-card border-2 gap-0 border-1 border-[#E7B250] rounded-none"
              >

                <div className="flex justify-center md:justify-between">
                  {/* Avatar */}
                  <div className="mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-[100px] h-[100px] rounded-full object-cover"
                    />
                  </div>

                  <Image
                    src="/images/users/quote.png"
                    alt="quote-icon"
                    width={87}
                    height={57}
                    className=" hidden md:block h-[57px] object-contain"
                  />

                </div>

                {/* Star rating */}
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1
                    return (
                      <div key={i} className="relative">
                        {starValue <= Math.floor(testimonial.rating) ? (
                          <Star className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                        ) : starValue - 0.5 === testimonial.rating ? (
                          <>
                            <Star className="w-5 h-5 fill-none text-[#fbbf24]" />
                            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                              <Star className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                            </div>
                          </>
                        ) : (
                          <Star className="w-5 h-5 fill-none text-[#fbbf24]" />
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Testimonial text */}
                <p className="text-foreground text-sm leading-relaxed mb-6">{testimonial.text}</p>

                {/* Author info */}
                <div className="flex justify-center md:justify-start items-baseline gap-1">
                  <span className="font-bold text-foreground text-lg">{testimonial.name}</span>
                  <span className="text-[#f59e0b] text-sm font-medium">{testimonial.location}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Faq Section Start Here */}

      <FaqSection />
      

      {/* Latest Blog Start Here */}

      <section className="bg-white py-28">
        <div className="cus-container">
                    
          {/* Heading */}
          <SectionHeading
            title="Latest Blogs"
            subtitle="Read helpful tips, trends, and parenting guides from our experts."
          />

          {/* Blog Grid */}
          <div className="mt-16 grid gap-10 px-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex flex-col">
                
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-[440px] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Meta */}
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <HiOutlineCalendar className="text-base" />
                  <span>{blog.date}</span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-xl font-semibold leading-snug text-[#1B1918]">
                  {blog.title}
                </h3>

                {/* Button */}
                <div className="mt-6">
                  <Button
                    href={blog.link}
                    bgColor="bg-[#094745]"
                    textColor="text-white"
                    px="px-8"
                    py="py-4"
                    fontSize="text-sm"
                    className="w-full rounded-none"
                  >
                    EXPLORE MORE
                  </Button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
