import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ProductCard({ item }) {
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };
  return (
    <div className="max-w-sm w-full rounded overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transition-transform transform hover:scale-105">
      <div className="relative">
        <Link to={`/${item.id}`}>
          <img
            className="w-full h-64 object-scale-down object-center"
            src={item.image}
            alt={item.title}
          />
        </Link>
        <div className="absolute top-0 right-0 bg-red-500 text-white p-2 m-2 rounded-full">
          New
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.title}</div>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <span className="text-gray-600 font-bold text-lg">${item.price}</span>
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isClicked ? "scale-110" : ""
          } ease-in-out`}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
