import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Pagina nao encontrada
      </h2>
      <Link
        href="/"
        className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Voltar ao inicio
      </Link>
    </div>
  );
}
