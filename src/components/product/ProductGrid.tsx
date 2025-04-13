
import React from 'react';
import ProductCard from './ProductCard';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { toast } = useToast();
  
  const handleAddToCart = (product: Product) => {
    // In a real app, this would add to cart state/context
    console.log('Added to cart:', product);
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={() => handleAddToCart(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
