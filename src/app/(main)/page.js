import CtaBanner from "@/components/cta/cta";
import FeaturedClasses from "@/components/featured/featured";
import HeroSection from "@/components/hero/Hero";
import HowItWorks from "@/components/how/How";
import LatestForum from "@/components/latest-forum/forum";
import WhyNexFit from "@/components/why/Why";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <FeaturedClasses></FeaturedClasses>
      <WhyNexFit></WhyNexFit>
      <HowItWorks></HowItWorks>
      <LatestForum></LatestForum>
      <CtaBanner></CtaBanner>
    </div>
  );
}
