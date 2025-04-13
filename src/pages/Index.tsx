
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Sample product data
const featuredProducts = [
  {
    id: 1,
    name: "Classic Green T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1400&auto=format&fit=crop",
    category: "T-Shirts",
    isNew: true,
  },
  {
    id: 2,
    name: "Crocco Cap",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1400&auto=format&fit=crop",
    category: "Accessories",
  },
  {
    id: 3,
    name: "Urban Hoodie",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1400&auto=format&fit=crop",
    category: "Hoodies",
    isSale: true,
  },
  {
    id: 4,
    name: "Premium Logo T-Shirt",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1400&auto=format&fit=crop",
    category: "T-Shirts",
  },
];

// Sample categories data
const categories = [
  {
    id: 1,
    name: "T-Shirts",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1400&auto=format&fit=crop",
    path: "/category/tshirts",
  },
  {
    id: 2,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1400&auto=format&fit=crop",
    path: "/category/accessories",
  },
  {
    id: 3,
    name: "Hoodies",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1400&auto=format&fit=crop",
    path: "/category/hoodies",
  },
  {
    id: 4,
    name: "Caps",
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1400&auto=format&fit=crop",
    path: "/category/caps",
  },
];

const Index = () => {
  const { toast } = useToast();
  
  const subscribeToNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "You have successfully subscribed to our newsletter.",
    });
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">Premium Algerian Style</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in">
              Discover the latest collection of Crocco's DZ clothing and accessories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button asChild size="lg" className="bg-white text-crocco hover:bg-gray-100">
                <Link to="/category/tshirts">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-crocco">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={category.path}
                className="group relative overflow-hidden rounded-lg aspect-square shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                    <span className="text-white/80 text-sm group-hover:underline">Shop Now</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-crocco hover:underline mt-4 md:mt-0">
              View All Products
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-crocco text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="opacity-90">Subscribe to our newsletter to get updates on our latest collections and special offers</p>
          </div>
          <form onSubmit={subscribeToNewsletter} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-grow px-4 py-3 rounded-md text-black"
            />
            <Button type="submit" className="bg-white text-crocco hover:bg-gray-100">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
