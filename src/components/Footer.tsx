import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-black tracking-tight leading-none mb-4">
              LAUNDRY<br/><span className="text-blue-500">MALL</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Your one-stop shop for professional laundry and dry cleaning supplies, equipment, and accessories.
              <br/><br/>
              A proud entity of <strong>LaundryTO.in</strong>.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=Hangers" className="hover:text-white transition">Hangers</Link></li>
              <li><Link href="/products?category=Chemicals" className="hover:text-white transition">Chemicals</Link></li>
              <li><Link href="/products?category=Machinery" className="hover:text-white transition">Machinery</Link></li>
              <li><Link href="/products?category=Accessories" className="hover:text-white transition">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <address className="text-sm not-italic space-y-2 text-gray-400">
              <p>Email: info@laundrymall.com</p>
              <p>Phone: +91 1234567890</p>
              <p>Ahmedabad, Gujarat, India</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Laundry Mall. Owned and operated by LaundryTO.in. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
