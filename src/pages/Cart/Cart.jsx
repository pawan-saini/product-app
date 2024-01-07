import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="container mx-auto mt-6 p-4">
      <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="container mx-auto my-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-300 py-2"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4 rounded-md"
                />
                <div>
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-gray-500">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="text-xl font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="mt-4">
            <p className="text-2xl font-bold">
              Total: ${calculateTotal(cartItems).toFixed(2)}
            </p>
          </div>
          <div className="mt-8">
            <Link to="/checkout">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
                Place Order
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

const calculateTotal = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
