"use client"

export const dynamic = "force-dynamic"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Algo deu errado</h2>
          <button
            onClick={() => reset()}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  )
}
