import Image from "next/image";
import SectionHeading from "../common/SectionHeading"
import { HiOutlineCalendar } from "react-icons/hi";
import Button from "../common/Button";

const blogs = [
  {
    id: 1,
    image: "/images/blogs/blog-1.png",
    date: "November 6, 2025",
    title: "Styling Tips: How to Wear Designer Jewellery for Every Occasion",
    link: "/blogs/styling-tips",
  },
  {
    id: 2,
    image: "/images/blogs/blog-2.png",
    date: "November 6, 2025",
    title: "Luxury on a Budget: Best Affordable Designer Handbags",
    link: "/blogs/luxury-on-budget",
  },
  {
    id: 3,
    image: "/images/blogs/blog-3.png",
    date: "November 6, 2025",
    title: "How Luxury Jewellery Brands Are Embracing Sustainability",
    link: "/blogs/sustainability",
  },
];

const BlogSection = () => {
    return   <section className="bg-white py-28">
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
                  <Image
                    width={400}
                    height={440}
                    src={blog.image}
                    alt={blog.title}
                    className="h-110 w-full object-cover transition-transform duration-500 hover:scale-105"
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
                    // href={blog.link}
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
}

export default BlogSection;