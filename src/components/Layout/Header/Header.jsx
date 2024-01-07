import { Link } from "react-router-dom";
import Logo from "../../../assets/mobo-logo.jpeg";
import * as URL from "../../../Routes/Routes";

import CartIcon from "../../HomePage/CartIcon";

import { useSelector } from "react-redux";

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const qty = cartItems.reduce((n, { quantity }) => n + quantity, 0);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/">
            <img
              src={Logo} // Replace with your actual logo path or URL
              alt="Logo"
              className="h-8 mr-2"
            />
          </a>
          <h1 className="text-xl font-bold block sm:hidden">Mobio</h1>
          <h1 className="text-xl font-bold hidden sm:block">
            Mobio | Online Shopping Store{" "}
          </h1>
        </div>
        <nav className="flex space-x-4">
          <Link to={URL.AddToCart}>
            <CartIcon totalItems={qty} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
