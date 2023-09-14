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
          <div className="relative">
            <h1
              className={`text-5xl sm:text-7xl lg:text-9xl text-shine text-neon-title ${
                center ? "text-center lg:text-left" : ""
              }`}
            >
              {title}
            </h1>
            <span
              className={`absolute top-0 sm:text-7xl text-5xl lg:text-9xl text-shine ${
                center ? "text-center lg:text-left left-0 right-0" : ""
              }`}
            >
              {title}
            </span>
          </div>
        )}
        {subTitle && (
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl text-white text-neon
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
