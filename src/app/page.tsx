export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#1A2332] mb-12">
          Klyfta
        </h1>

        <p className="text-lg leading-relaxed text-[#1A2332] mb-6">
          Klyfta is the email provider for European businesses that care about EU data residency.
        </p>

        <p className="text-lg leading-relaxed text-[#1A2332] mb-6">
          Mail, calendar, and contacts hosted in the EU, encrypted at rest, GDPR-native by default.
        </p>

        <p className="text-lg leading-relaxed text-[#1A2332] mb-12">
          A Swedish company built for those who think where your data lives matters.
        </p>

        <div className="border-t border-[#8A9BA8]/30 pt-8">
          <p className="text-sm text-[#8A9BA8] mb-2">
            Launching August 2026
          </p>
          <a
            href="mailto:hello@klyfta.eu"
            className="text-base text-[#3B5F7F] hover:text-[#1A2332] transition-colors underline underline-offset-4 decoration-1"
          >
            hello@klyfta.eu
          </a>
        </div>
      </div>
    </main>
  );
}