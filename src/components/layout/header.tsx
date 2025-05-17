import Link from "next/link";
import SignOut from "../ui/auth/sign-out";
export default async function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">My Blog</h1>
      <nav className="flex items-center space-x-4">
        <SignOut />

        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-400">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-400">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
