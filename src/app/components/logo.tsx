import './neon.css';

export default function Logo() {
  return (
    <div className="font-monoton">
      <div className="relative hover:animate-spin-slow cursor-grab">
        <span className="absolute z-2 left-0 text-5xl lg:text-5xl neon-text">A</span>
        <span className="relative z-0 text-5xl lg:text-5xl text-shine">A</span>
      </div>
    </div>
  );
}
