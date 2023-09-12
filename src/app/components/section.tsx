import { ReactElement } from "react";

export const Section = ({
  children,
  fullVw,
}: {
  fullVw?: boolean;
  children: ReactElement;
}) => {
  return (
    <>
      <section
        className={`container mx-auto flex justify-center items-center
       ${fullVw ? "h-screen" : ""}`}
      >
        <div className="rounded-3xl bg-midnight/30 w-full p-8 lg:p-16 m-8">
          {children}
        </div>
      </section>
    </>
  );
};
