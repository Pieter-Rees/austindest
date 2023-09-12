import localFont from "next/font/local";
import "./neon.css";

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: "../../../public/fonts/Monoton-Regular.woff2",
});

export const Title = ({
  title,
  subTitle,
}: {
  title?: string;
  subTitle?: string;
}) => {
  return (
    <div className={myFont.className}>
      <h1 className="text-9xl text-white text-neon">{title}</h1>
      <h2 className="text-5xl text-white text-neon">{subTitle}</h2>
    </div>
  );
};
