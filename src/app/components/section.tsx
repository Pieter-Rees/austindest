import { ReactElement } from "react";

export const Section = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <section className={`container mx-auto m-8 m-16 flex h-full `}>
        <div className="rounded-3xl bg-midnight/30 w-full p-8 m-8 lg:p-16">
          {children}
        </div>
      </section>
    </>
  );
};
