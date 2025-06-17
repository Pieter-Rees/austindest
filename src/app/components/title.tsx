import localFont from "next/font/local";
import "./neon.css";

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: "../../../public/fonts/Monoton-Regular.woff2",
});

interface TitleProps {
  title?: string;
  subTitle?: string;
  left?: boolean;
  right?: boolean;
  smallTitle?: string;
  center?: boolean;
  margin?: boolean;
  centerText?: boolean;
}

export const Title = ({
  title,
  subTitle,
  left,
  right,
  smallTitle,
  center,
  margin,
  centerText,
}: TitleProps) => {
  const titleClasses = `text-7xl sm:text-8xl lg:text-9xl text-shine text-neon-title ${
    center ? "text-center lg:text-left" : ""
  }`;

  const subTitleClasses = `text-4xl sm:text-5xl lg:text-6xl text-white text-neon
    ${margin ? "mt-8" : ""}
    ${left ? "text-center lg:text-left" : ""}
    ${right ? "text-center lg:text-right" : ""}
    ${center ? "text-center" : ""}
  `;

  return (
    <div className="w-full">
      <div className={myFont.className}>
        {title && (
          <div className="relative" key="title-container">
            <h1 className={titleClasses} key="title-main">
              {title}
            </h1>
            <span
              className={`absolute top-0 text-7xl sm:text-8xl lg:text-9xl text-shine ${
                center ? "text-center lg:text-left left-0 right-0" : ""
              }`}
              key="title-shadow"
            >
              {title}
            </span>
          </div>
        )}
        {subTitle && (
          <h2 className={subTitleClasses} key="subtitle">
            {subTitle}
          </h2>
        )}
        {smallTitle && (
          <h3 className="text-lg lg:text-3xl text-white" key="small-title">
            {smallTitle}
          </h3>
        )}
      </div>
    </div>
  );
};
