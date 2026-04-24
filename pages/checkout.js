import Head from "next/head";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const { cartItems, getTotal, clearCart } = useCart();
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }

    try {
      // 🔹 Create Razorpay order
      const res = await fetch("http://localhost:5000/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: getTotal() * 100 }), // Razorpay uses paise
      });

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "QuickMeds",
        description: "Medicine Order",
        order_id: data.id,
        handler: async function (response) {
          try {
            // ✅ Save order in DB
            const saveRes = await fetch("http://localhost:5000/order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                items: cartItems,
                total: getTotal(),
                userEmail: user.email,
              }),
            });

            if (saveRes.ok) {
              alert("✅ Order placed successfully!");
              clearCart();
            } else {
              alert("❌ Payment success, but failed to save order.");
            }
          } catch (err) {
            console.error(err);
            alert("❌ Payment success, but error saving order.");
          }
        },
        prefill: {
          email: user.email,
        },
        theme: { color: "#ef4444" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to initiate payment.");
    }
  };

  return (
    <>
      <Head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <div className="min-h-screen bg-white text-black p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <p className="font-bold">₹{item.price * item.quantity}</p>
              </div>
            ))}

            <div className="flex justify-between text-lg font-bold pt-4 border-t">
              <span>Total:</span>
              <span>₹{getTotal()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Pay with Razorpay
            </button>
          </div>
        )}
      </div>
    </>
  );
}
