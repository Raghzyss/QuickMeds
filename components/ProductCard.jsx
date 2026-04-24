import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-2" />
      <h3 className="text-black font-semibold">{product.name}</h3>
      <p className="text-blue-600 font-bold mt-1">₹{product.price}</p>
      <button
        onClick={() => {
          addToCart(product);
          alert("✅ Added to cart");
        }}
        className="mt-3 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
