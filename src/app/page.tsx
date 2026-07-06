import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ResponsiveHero } from "@/components/hero/ResponsiveHero";
import { ProductIntro, SpecificationGrid, CameraStory, ProductGallery, VariantCards, FinalCTA } from "@/components/product/ProductStory";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ResponsiveHero />
        <ProductIntro />
        <SpecificationGrid />
        <CameraStory />
        <ProductGallery />
        <VariantCards />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
