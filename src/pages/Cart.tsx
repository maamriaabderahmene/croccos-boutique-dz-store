
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: "Classic Green T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1400&auto=format&fit=crop",
    size: "M",
    color: "Green",
    quantity: 1,
  },
  {
    id: 3,
    name: "Urban Hoodie",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1400&auto=format&fit=crop",
    size: "L",
    color: "Gray",
    quantity: 2,
  },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10.00; // Fixed shipping fee
  const total = subtotal + shipping;
  
  const handleApplyCoupon = () => {
    console.log('Applying coupon:', couponCode);
    // In a real app, this would validate and apply a discount
    if (couponCode) {
      alert(`Coupon "${couponCode}" is not valid.`);
    }
  };
  
  const isEmpty = cartItems.length === 0;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            {isEmpty 
              ? "Your cart is currently empty" 
              : `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>
        
        {isEmpty ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-6">
              <ShoppingBag size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild className="bg-crocco hover:bg-crocco-dark">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {/* Table Header - Desktop */}
              <div className="hidden md:grid md:grid-cols-5 py-2 px-4 bg-muted rounded-md">
                <div className="col-span-2">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>
              
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="border rounded-md p-4">
                    <div className="md:grid md:grid-cols-5 md:gap-4 md:items-center">
                      {/* Product - Mobile & Desktop */}
                      <div className="md:col-span-2 flex gap-4 mb-4 md:mb-0">
                        <div className="w-20 h-20 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.size} / {item.color}</p>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 mt-1"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                          
                          {/* Mobile Price */}
                          <div className="md:hidden mt-2">
                            <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price - Desktop */}
                      <div className="hidden md:block text-center">
                        ${item.price.toFixed(2)}
                      </div>
                      
                      {/* Quantity - Mobile & Desktop */}
                      <div className="md:text-center">
                        <div className="flex items-center md:justify-center border rounded-md w-[104px]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total - Mobile & Desktop */}
                      <div className="md:text-right mt-4 md:mt-0">
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-muted/30 rounded-md p-6 border">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
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
                
                <div className="flex justify-between font-semibold mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Coupon Code</label>
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                    />
                    <Button 
                      variant="outline" 
                      onClick={handleApplyCoupon}
                      disabled={!couponCode}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
                
                <Button 
                  asChild
                  className="w-full bg-crocco hover:bg-crocco-dark"
                >
                  <Link to="/checkout">
                    Checkout <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                
                <Button 
                  variant="link" 
                  asChild
                  className="w-full justify-center mt-2"
                >
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
