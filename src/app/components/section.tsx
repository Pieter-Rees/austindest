import { ReactElement } from "react";

export const Section = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <section
        className={`container mx-auto p-4 py-16 m-16 flex justify-center items-center h-screen rounded-3xl border-white`}
      >
        {children}
      </section>
    </>
  );
};
