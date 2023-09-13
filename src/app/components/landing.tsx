import { Title } from "./title";
import Socials from "./socials";

export default function Landing() {
  return (
    <div id="landing" className="w-full h-full mb-4 lg:mb-8 relative z-2">
      <div>
        <Title margin={true} title="Austin" subTitle="All About The Groove" />
      </div>
      <div className="flex justify-end mt-8">
        <Socials />
      </div>
    </div>
  );
}
