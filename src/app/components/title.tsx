import localFont from "next/font/local";
import "./neon.css";

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: "../../../public/fonts/Monoton-Regular.woff2",
});

export const Title = ({
  title,
  subTitle,
  left,
  right,
  smallTitle,
  center,
  margin,
}: {
  title?: string;
  subTitle?: string;
  left?: boolean;
  right?: boolean;
  smallTitle?: string;
  center?: boolean;
  margin?: boolean;
}) => {
  return (
    <div className="w-full">
      <div className={myFont.className}>
        {title && (
          <h1
            className={`text-5xl lg:text-9xl text-white text-neon ${
              center ? "text-center lg:text-left" : ""
            }`}
          >
            {title}
          </h1>
        )}
        {subTitle && (
          <h2
            className={`text-2xl lg:text-5xl text-white text-neon
            ${margin ? "mt-8" : ""}

            ${center ? "text-center lg:text-left" : ""}
            ${left ? "text-center lg:text-left" : ""}
          ${right ? "text-center lg:text-right" : ""}`}
          >
            {subTitle}
          </h2>
        )}
        {smallTitle && (
          <h3 className="text-lg lg:text-3xl text-white">{smallTitle}</h3>
        )}
      </div>
    </div>
  );
};
