export default function Button({
  children,
  bgColor = "bg-[#0f4a45]",
  textColor = "text-white",
  px = "px-3",
  py = "py-[13px]",
  fontSize = "text-base",
  className = "",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        ${bgColor}
        ${textColor}
        ${px}
        ${py}
        ${fontSize}
        ${className}
        transition
        hover:opacity-90
      `}
    >
      {children}
    </button>
  )
}
