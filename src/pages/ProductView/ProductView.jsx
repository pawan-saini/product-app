// * Components
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Loader from "../../components/UI/Loader/Loader";

// * APIs
import { getProductById } from "../../api/services/Home";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/cartSlice";

export default function ProductView() {
  const [isClicked, setIsClicked] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    document.title = "Product Details";
  }, []);

  const dispatch = useDispatch();

  const getProductAPI = useQuery({
    queryKey: ["getProductById"],
    queryFn: () => getProductById(id),
    refetchOnWindowFocus: false,
  });

  const { data, isLoading } = getProductAPI;

  const handleAddToCart = () => {
    dispatch(addToCart(data));
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  return (
    <div className="container mx-auto mt-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:order-2">
          <img
            src={data?.image}
            alt={data?.title}
            className="object-cover w-full h-96 mb-4 rounded-md shadow-md"
          />
        </div>
        <div className="md:order-1">
          <h1 className="text-3xl font-semibold mb-4">{data?.title}</h1>
          <p className="text-gray-600 mb-4">{data?.description}</p>
          <p className="text-blue-500 font-bold mb-4">${data?.price}</p>

          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md transition-transform transform ${
              isClicked ? "scale-110" : ""
            } ease-in-out`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
