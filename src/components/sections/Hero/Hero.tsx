import { CTAButton } from "@/components/shared/CTAButton"

const WHATSAPP_HREF = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20plataforma!"
const PRICING_HREF = "#pricing"

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-900 to-indigo-900 bg-[length:400%_400%] animate-gradient"
    >
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-white/10 border border-white/20 text-sm font-medium text-white/90 backdrop-blur-sm">
            <span className="size-2 rounded-full bg-[#25D366]" aria-hidden="true" />
            Novo: Automação via WhatsApp Business
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Venda mais com{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              WhatsApp
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-lg sm:text-xl leading-8 font-normal text-white/75">
            Automatize seu atendimento, converta leads e escale suas vendas com a plataforma SaaS mais completa do Brasil.
          </p>

          <div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            role="group"
            aria-label="Ações principais"
          >
            <CTAButton href={WHATSAPP_HREF} variant="primary">
              Falar com WhatsApp
            </CTAButton>
            <CTAButton href={PRICING_HREF} variant="secondary">
              Ver Planos
            </CTAButton>
          </div>
        </div>

        <div className="relative hidden lg:flex items-center justify-center" aria-hidden="true">
          <div className="relative w-full aspect-square max-w-lg rounded-2xl overflow-hidden shadow-2xl shadow-indigo-950/50 bg-gradient-to-br from-indigo-800/50 to-violet-700/50 border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/20 text-center">
                <div className="text-8xl font-bold">💬</div>
                <div className="mt-4 text-xl font-semibold">WhatsApp SaaS</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-transparent to-transparent rounded-2xl" />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full px-4 py-2 bg-[#25D366] text-white text-sm font-semibold shadow-lg">
              <span>✓</span>
              <span>1.200+ empresas ativas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
