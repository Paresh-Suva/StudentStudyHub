import AcademicHero from "@/components/AcademicHero";
import VelocityScroll from "@/components/VelocityScroll";
import StreamGrid from "@/components/StreamGrid";
import FeatureGrid from "@/components/landing/FeatureGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-cyan-500/30">
      <AcademicHero />
      <VelocityScroll />
      <StreamGrid />
      <FeatureGrid />
    </main>
  );
}
