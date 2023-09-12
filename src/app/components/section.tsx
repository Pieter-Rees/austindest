import { ReactElement } from "react";

export const Section = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <section
        className={`container mx-auto p-8 lg:p-16 m-16 flex h-screen rounded-3xl bg-midnight/30`}
      >
        {children}
      </section>
    </>
  );
};
