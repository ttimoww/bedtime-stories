import { LandingPageCTA } from "@/components/landing-page-cta";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Create Magical Bedtime Stories
        </h1>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
          Generate personalized bedtime stories for your children using AI. Make
          bedtime an unforgettable adventure.
        </p>
        <LandingPageCTA />
      </div>
    </div>
  );
}
