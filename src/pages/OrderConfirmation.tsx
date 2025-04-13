
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, Truck, Calendar, File } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const OrderConfirmation: React.FC = () => {
  // In a real app, these would come from the order processing system
  const orderNumber = "CR-123456789";
  const orderDate = new Date().toLocaleDateString();
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
          {/* Success Message */}
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          {/* Order Info Box */}
          <div className="bg-muted/30 rounded-md p-6 text-left mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-semibold">{orderNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold">{orderDate}</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-crocco flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Shipping Information</p>
                  <p className="text-sm text-muted-foreground">
                    Your order will be shipped to the address provided during checkout.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar size={20} className="text-crocco flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-sm text-muted-foreground">{estimatedDelivery}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <File size={20} className="text-crocco flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Order Details</p>
                  <p className="text-sm text-muted-foreground">
                    A confirmation email with your order details has been sent to your email address.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-crocco hover:bg-crocco-dark">
              <Link to="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/account/orders">View Order History</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
