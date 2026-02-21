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
        <div>
          <button onClick={() => reset()}>Tentar novamente</button>
        </div>
      </body>
    </html>
  )
}
