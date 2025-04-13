
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
  isSale = false,
  onAddToCart,
}) => {
  return (
    <Card className="product-card overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        {/* Status badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-crocco text-white">New</Badge>
          )}
          {isSale && (
            <Badge variant="destructive">Sale</Badge>
          )}
        </div>
        
        {/* Wishlist button */}
        <button 
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart size={18} className="text-gray-600 hover:text-crocco" />
        </button>
        
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>
      
      <CardContent className="flex-grow pt-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-base hover:text-crocco transition-colors line-clamp-1">{name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm">{category}</p>
        <p className="mt-2 text-lg font-semibold">${price.toFixed(2)}</p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-crocco hover:bg-crocco-dark" 
          onClick={onAddToCart}
        >
          <ShoppingCart size={16} className="mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
