import localFont from "next/font/local";

const myFont = localFont({
  src: "../../public/fonts/Monoton-Regular.woff2",
});

export default function Logo() {
  return (
    <div className={myFont.className}>
      <div className="relative hover:scale-105 transition-transform duration-200 cursor-pointer">
        <span className="text-2xl lg:text-3xl text-foreground font-light tracking-wider">
          A
        </span>
      </div>
    </div>
  );
}
