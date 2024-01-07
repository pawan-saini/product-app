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
    <div
      key={item.id}
      className="bg-white p-4 shadow-md rounded-md transition-transform transform hover:scale-105"
    >
      <Link to={`/${item.id}`}>
        <img
          src={item.image}
          alt={item.title}
          className="object-scale-down w-full h-48 mb-4 rounded-md"
        />
      </Link>
      <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
      {/* <p className="text-gray-600">{item.description}</p> */}
      <p className="text-blue-500 font-bold mt-2">${item.price}</p>

      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded-md transition-transform transform ${
          isClicked ? "scale-110" : ""
        } ease-in-out`}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
