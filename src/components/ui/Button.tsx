import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-full bg-gradient-to-r from-black to-gray-400 text-white
        font-bold py-4 px-5 rounded-lg text-xl
        hover:from-orange-700 hover:to-red-700
        transform hover:scale-105 transition-all duration-200 shadow-lg
        ${className}
      `}
    >
      {children}
    </button>
  );
}
