
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-crocco text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Crocco's DZ</h2>
            <p className="text-sm">Premium Algerian clothing brand offering stylish and high-quality apparel for all occasions.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-crocco-accent">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-crocco-accent">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-crocco-accent">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/category/tshirts" className="hover:underline">T-Shirts</Link></li>
              <li><Link to="/category/accessories" className="hover:underline">Accessories</Link></li>
              <li><Link to="/category/hoodies" className="hover:underline">Hoodies</Link></li>
              <li><Link to="/category/caps" className="hover:underline">Caps</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:underline">Shipping & Returns</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123 Rue Main, Algiers, Algeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+213 123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@croccosdz.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-sm text-center">
          <p>© {new Date().getFullYear()} Crocco's DZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
