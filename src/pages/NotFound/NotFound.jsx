import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="h-screen grid min-h-full place-items-center bg-Dark px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-Accent">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-Light sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-Accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-Accent-Dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
          {/* <a href="#" className="text-sm font-semibold text-Light">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </div>
    </main>
  );
}
