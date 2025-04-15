
import React from 'react';
import Layout from '@/components/layout/Layout';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface ProductOrderDetails {
  id: number;
  name: string;
  price: number;
  image?: string;
  category: string;
  quantity: number;
  size?: string | null;
  color?: string | null;
}

interface LocationState {
  product?: ProductOrderDetails;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;
  
  // If no product is provided, use a default one
  const orderItem = state?.product || {
    id: 1,
    name: "Classic Green T-Shirt",
    price: 2999,
    quantity: 1,
    category: "T-Shirts"
  };
  
  const subtotal = orderItem.price * orderItem.quantity;
  const shipping = 500; // 500 DZD fixed shipping fee
  const total = subtotal + shipping;
  
  // Format the items as needed for display
  const displayItem = {
    ...orderItem,
    details: orderItem.size && orderItem.color ? 
      `Size: ${orderItem.size}, Color: ${orderItem.color}` : ''
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="flex items-center text-sm text-crocco hover:underline">
            <ChevronLeft size={16} className="mr-1" />
            Back to Shopping
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
              
              {/* Order Item */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-4 items-center">
                  {displayItem.image && (
                    <div className="w-16 h-16 rounded-md border overflow-hidden flex-shrink-0">
                      <img 
                        src={displayItem.image} 
                        alt={displayItem.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{displayItem.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {displayItem.details}
                    </p>
                    <p className="text-sm text-muted-foreground">Qty: {displayItem.quantity}</p>
                  </div>
                  <span>{displayItem.price.toLocaleString()} DZD</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Order Totals */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{subtotal.toLocaleString()} DZD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping.toLocaleString()} DZD</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{total.toLocaleString()} DZD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
