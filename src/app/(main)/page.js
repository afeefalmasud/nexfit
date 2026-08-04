import HeroSection from "@/components/hero/Hero";
import HowItWorks from "@/components/how/How";
import WhyNexFit from "@/components/why/Why";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <WhyNexFit></WhyNexFit>
      <HowItWorks></HowItWorks>
    </div>
  );
}
