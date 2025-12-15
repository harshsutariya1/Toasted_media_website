import Hero from "@/components/Hero";
import MagneticNav from "@/components/MagneticNav";
import ServicesStack from "@/components/ServicesStack";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-toasted-black text-white selection:bg-toasted-teal selection:text-black overflow-x-hidden">
      <MagneticNav />
      <Hero />

      {/* Spacer to transition from Hero */}
      <div className="relative z-10 w-full flex items-center justify-center py-20">
        <p className="text-white/50 text-sm tracking-widest uppercase animate-pulse">Scroll to Ignite</p>
      </div>

      <ServicesStack />

      <footer className="h-[50vh] flex items-center justify-center border-t border-white/10 bg-black z-10 relative">
        <h2 className="text-[10vw] font-black text-white/10 select-none">TOASTED</h2>
      </footer>
    </main>
  );
}
