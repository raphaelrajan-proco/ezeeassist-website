interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl border border-[#E5E7EB]
        shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.04)]
        p-6
        ${hover ? "card-hover cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
