// * Components
// import { useQuery } from "@tanstack/react-query";
import ProductList from "../../components/HomePage/ProductList/ProductList";
import { useEffect, useState } from "react";

// import Loader from "../../components/UI/Loader/Loader";

// * APIs
// import { getProducts } from "../../api/services/Home";
import { useDispatch, useSelector } from "react-redux";
// import { setProducts } from "../../redux/productSlice";
import { fetchProducts, sortProducts } from "../../redux/productSlice";

export default function HomePage() {
  const [sortType, setSortType] = useState("");
  useEffect(() => {
    document.title = "Store";
    window.scrollTo(0, 0);
  }, []);

  const handleSort = (type) => {
    setSortType(type);
    console.log(type);
    // Sort the products based on the provided criteria
    dispatch(sortProducts(type));
  };

  // const getSortedProducts = () => {
  //   let sortedProducts = [...snapshot.products];
  //   if (sortType === "price") {
  //     sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
  //   } else if (sortType === "name") {
  //     sortedProducts = sortedProducts.sort((a, b) =>
  //       a.title.localeCompare(b.title)
  //     );
  //   }
  //   return sortedProducts;
  // };

  // const getProductAPI = useQuery({
  //   queryKey: ["getProducts"],
  //   queryFn: () => getProducts(),
  //   refetchOnWindowFocus: false,
  // });

  // const { data, isLoading } = getProductAPI;
  // if (isLoading)
  //   return (
  //     <div className="min-h-screen flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className="bg-Dark">
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto p-4 flex-grow">
          <h1 className="text-2xl font-bold mb-4">Daily Styles Refresh</h1>

          <div className="flex justify-end mb-4">
            <label>Sort:</label>
            <select
              onChange={(e) => handleSort(e.target.value)}
              value={sortType}
            >
              <option value=""></option>
              <option value="price-true">Price(Low-High)</option>
              <option value="price-false">Price(High-Low)</option>
              <option value="title-true">Name</option>
            </select>
          </div>

          <ProductList products={products} />
        </div>
      </div>
    </main>
  );
}
