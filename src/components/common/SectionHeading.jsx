export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="font-serif text-4xl font-semibold text-[#0f4a45]">
        {title}
      </h2>
      <p className="mt-2 text-gray-500">
        {subtitle}
      </p>
    </div>
  )
}
