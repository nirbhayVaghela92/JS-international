"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import SectionHeading from "@/components/common/SectionHeading"
import { FiPlus, FiMinus } from "react-icons/fi"

const faqs = [
  {
    id: "item-1",
    question: "What makes JS International products unique?",
    answer:
      "JS International products are crafted with premium materials, timeless design, and meticulous attention to detail to ensure lasting quality.",
  },
  {
    id: "item-2",
    question:
      "How do I know which watch or jewellery piece is right for me?",
    answer:
      "Each product page includes detailed specifications, style notes, and size information to help you choose the perfect piece.",
  },
  {
    id: "item-3",
    question: "Do you offer cash on delivery (COD)?",
    answer:
      "Yes, we offer cash on delivery for selected locations. Availability will be shown at checkout.",
  },
  {
    id: "item-4",
    question: "How long will delivery take?",
    answer:
      "Orders are typically delivered within 5–7 business days depending on your location.",
  },
  {
    id: "item-5",
    question: "Can I return or exchange an item?",
    answer:
      "Yes, returns and exchanges are available within our policy guidelines. Please refer to our return policy page.",
  },
  {
    id: "item-6",
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you’ll receive a tracking link via email and SMS.",
  },
  {
    id: "item-7",
    question: "Return and Exchange Policy",
    answer:
      "We offer easy returns and exchanges within the policy period. Items must be unused and in original packaging.",
  },
]

export default function FaqSection() {
  return (
    <section className="py-24">
      <div className="cus-container cus-accordion">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Quick answers to help you shop with confidence."
        />

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`
                font-sans
                border border-[#B4AFAC]
                ${index !== faqs.length - 1 ? "mb-6" : ""}
                data-[state=open]:border-[#E7B250]
              `}
            >
              <AccordionItem value={faq.id} className="border-none">
                <AccordionTrigger
                  className="
                    group flex w-full items-center justify-between
                    px-6 py-6
                    rounded-none
                    text-left text-[18px] md:text-[24px] font-bold
                    text-[#1B1918]
                    hover:no-underline
                    [&>svg]:hidden
                    data-[state=open]:bg-[#094745]
                    data-[state=open]:text-[#E7B250]
                  "
                >
                  <span>{faq.question}</span>

                  <span className="ml-4 flex h-8 min-w-8 items-center justify-center rounded-full border border-current">
                    <FiPlus className="group-data-[state=open]:hidden" />
                    <FiMinus className="hidden group-data-[state=open]:block" />
                  </span>
                </AccordionTrigger>

                <AccordionContent className="bg-[#094745] px-6 pb-10 text-white">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>

      </div>
    </section>
  )
}


