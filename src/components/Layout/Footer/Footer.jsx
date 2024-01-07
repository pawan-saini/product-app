export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; 2024 Your Company. All rights reserved.
        </p>
        <div className="mt-2">
          <a href="/privacy" className="text-gray-300 hover:text-white mx-2">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-300 hover:text-white mx-2">
            Terms of Service
          </a>
          <a href="/contact" className="text-gray-300 hover:text-white mx-2">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
