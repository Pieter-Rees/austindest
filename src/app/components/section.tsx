import { ReactElement } from "react";

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
      className={` w-full flex  justify-center items-center relative z-2 ${
        bg
          ? "bg-gradient-to-r from-bubblegum/20 to=blue/20 backdrop-blur-md"
          : ""
      }
       ${fullVh ? "h-screen" : ""}`}
    >
      <div className="rounded-3xl bg-bubblegum/20 backdrop-blur-lg w-full lg:mx-24 xl:mx-48 p-4 md:p-8 lg:p-16 m-8 lg:my-16">
        {children}
      </div>
    </section>
  );
};
