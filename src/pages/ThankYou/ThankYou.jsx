import { Link } from "react-router-dom"; // If you're using React Router

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-700 mb-4">
          Your order has been successfully placed. We appreciate your business!
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
}
