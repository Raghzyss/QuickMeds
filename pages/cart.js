import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cartItems, increaseQty, decreaseQty } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4 max-w-xl mx-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div>
                <h3 className="font-semibold text-black">{item.name}</h3>
                <p className="text-blue-600 font-bold">₹{item.price}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-gray-200 px-2 rounded hover:bg-gray-300 text-black"
                >
                  −
                </button>
                <span className="text-black">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-gray-200 px-2 rounded hover:bg-gray-300 text-black"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
