import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-brand-primary-50 via-brand-secondary-50 to-brand-items-50 dark:from-brand-primary-950 dark:via-brand-secondary-900 dark:to-brand-items-900">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-primary-200 dark:bg-brand-primary-800 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-secondary-200 dark:bg-brand-secondary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-brand-items-200 dark:bg-brand-items-700 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-xl px-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-brand-fg-primary dark:text-brand-fg-primary mb-4 drop-shadow-lg">
          Welcome to <br />
          Box-Awfis
        </h1>
        <p className="text-lg sm:text-xl text-brand-fg-secondary dark:text-brand-fg-secondary mb-8">
          Your one-stop destination for all events and activities nearby.
        </p>
        <Link
          href={"/events_near_by"}
          className="px-8 py-3 rounded-2xl font-semibold bg-brand-primary-500 text-white shadow-lg hover:bg-brand-primary-600 transition-all duration-300">
          Get Started
        </Link>
      </div>
    </div>
  );
}
