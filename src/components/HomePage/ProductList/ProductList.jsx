import ProductCard from "../ProductCard/ProductCard";

export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products?.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}
