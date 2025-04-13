
import React from 'react';
import Layout from '@/components/layout/Layout';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample cart items for order summary
const cartItems = [
  {
    id: 1,
    name: "Classic Green T-Shirt",
    price: 29.99,
    quantity: 1,
  },
  {
    id: 3,
    name: "Urban Hoodie",
    price: 49.99,
    quantity: 2,
  },
];

const Checkout: React.FC = () => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10.00; // Fixed shipping fee
  const total = subtotal + shipping;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/cart" className="flex items-center text-sm text-crocco hover:underline">
            <ChevronLeft size={16} className="mr-1" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold mt-4">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-md shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
              <CheckoutForm />
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 rounded-md p-6 border sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {/* Order Totals */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
