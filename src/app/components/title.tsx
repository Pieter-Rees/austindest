import localFont from "next/font/local";
import "./neon.css";

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: "../../../public/fonts/Monoton-Regular.woff2",
});

export const Title = ({
  title,
  subTitle,
  right,
}: {
  title?: string;
  subTitle?: string;
  right?: boolean;
}) => {
  return (
    <div className="w-full">
      <div className={myFont.className}>
        <h1 className="text-5xl lg:text-9xl text-white text-neon mb-4 lg:mb-8">
          {title}
        </h1>
        <h2
          className={`text-lg lg:text-5xl text-white text-neon mb-4 lg:mb-8
        ${right ? "text-right" : ""}`}
        >
          {subTitle}
        </h2>
      </div>
    </div>
  );
};
