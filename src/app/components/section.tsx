import { ReactElement } from "react";

export const Section = ({
  children,
  fullVw,
  bg,
}: {
  fullVw?: boolean;
  bg?: boolean;
  children: ReactElement;
}) => {
  return (
    <>
      <section
        className={` w-full flex justify-center items-center relative z-2 ${
          bg ? "bg-black" : ""
        }
       ${fullVw ? "h-screen" : ""}`}
      >
        <div className="rounded-3xl bg-midnight/30 w-full p-8 lg:p-16 m-8">
          {children}
        </div>
      </section>
    </>
  );
};
