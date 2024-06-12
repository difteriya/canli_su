import Link from "next/link";
export default function Custom404() {
  return (
    <section className="flex items-center h-full p-16 ">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold ">
            Üzr istəyirik, bu səhifəni tapa bilmədik.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            Ancaq narahat olmayın, ana səhifəmizdə bir çox başqa şeylər tapa
            bilərsiniz.
          </p>
          <Link href="/">
            <a className="px-6 py-3 font-semibold rounded-md border bg-white hover:border-gray-300 shadow-sm ">
              Əsas səhifəyə qayıt
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
