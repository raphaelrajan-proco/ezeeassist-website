interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Background shorthand — pass a Tailwind bg class like "bg-[#F7F8FA]" */
  bg?: string;
  id?: string;
}

export default function SectionWrapper({
  children,
  className = "",
  bg = "",
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={`w-full ${bg}`}>
      <div className={`mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 ${className}`}>
        {children}
      </div>
    </section>
  );
}
