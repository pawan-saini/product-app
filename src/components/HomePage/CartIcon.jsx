import { FaShoppingCart } from "react-icons/fa";
export default function CartIcon({ totalItems }) {
  return (
    <div className="relative">
      <FaShoppingCart />

      {totalItems > 0 && (
        <div className="absolute  text-sm top-[-7px] right-[-5px] bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
          {totalItems}
        </div>
      )}
    </div>
  );
}
