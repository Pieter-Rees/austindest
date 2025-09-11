import type { ReactElement } from "react";

export const Section = ({
  children,
  fullVh,
  bg,
  id,
}: {
  fullVh?: boolean;
  bg?: boolean;
  children: ReactElement;
  id?: string;
}) => {
  return (
    <section
      id={id}
      className={`
        w-full flex justify-center items-center relative z-2
        ${bg ? "bg-muted/5" : ""}
        ${fullVh ? "min-h-screen" : "py-16 md:py-24"}
      `}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};
