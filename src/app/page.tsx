import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollVideoHero } from "@/components/hero/ScrollVideoHero";
import { ProductIntro, SpecificationGrid, CameraStory, ProductGallery, VariantCards, FinalCTA } from "@/components/product/ProductStory";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ScrollVideoHero />
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
