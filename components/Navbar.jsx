import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, login, logout } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-black">QuickMeds</div>

      <div className="flex items-center space-x-4">
        <Link href="/" className="text-black hover:text-blue-600">Home</Link>
        <Link href="/cart" className="text-black hover:text-blue-600">Cart</Link>
        <Link href="/checkout" className="text-black hover:text-blue-600">Checkout</Link>

        {user ? (
          <>
            <span className="text-sm text-black">{user.displayName || user.email}</span>
            <button onClick={logout} className="text-blue-600 border px-2 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <button onClick={login} className="text-blue-600 border px-2 py-1 rounded">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
