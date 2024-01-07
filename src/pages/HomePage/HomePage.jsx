// * Components

import ProductList from "../../components/HomePage/ProductList/ProductList";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

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
              <option value="price-true">Price(Low to High)</option>
              <option value="price-false">Price(High to Low)</option>
              <option value="title-true">Name(A to Z)</option>
              <option value="title-false">Name(Z to A)</option>
            </select>
          </div>

          <ProductList products={products} />
        </div>
      </div>
    </main>
  );
}
