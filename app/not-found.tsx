export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-min text-primary-max text-center px-4">
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Oops! Page not found</h2>
      <p className="text-md md:text-lg text-gray-600 mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="bg-primary-max text-white px-6 py-3 rounded-14 shadow-md hover:bg-blue-900 transition duration-300">
        Go Back Home
      </a>
    </div>
  );
}
