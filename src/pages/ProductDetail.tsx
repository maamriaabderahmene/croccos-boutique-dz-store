
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Heart, Share2, Minus, Plus, Check, Star } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ProductGrid from '@/components/product/ProductGrid';

// Sample product data
const product = {
  id: 1,
  name: "Classic Green T-Shirt",
  price: 29.99,
  images: [
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593726891346-e5a19a86596b?q=80&w=1400&auto=format&fit=crop",
  ],
  description: "Our classic green t-shirt made with 100% organic cotton. Features the iconic Crocco's logo embroidered on the chest. This comfortable and stylish t-shirt is perfect for casual everyday wear.",
  category: "T-Shirts",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Green", "Black", "White"],
  inStock: true,
  rating: 4.5,
  reviews: 24,
};

// Sample related products
const relatedProducts = [
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
  },
  {
    id: 4,
    name: "Premium Logo T-Shirt",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1400&auto=format&fit=crop",
    category: "T-Shirts",
  },
  {
    id: 5,
    name: "Sport T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?q=80&w=1400&auto=format&fit=crop",
    category: "T-Shirts",
  },
];

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { toast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string>(product.images[0]);
  
  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10)); // Max 10 items
  };
  
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1)); // Min 1 item
  };
  
  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} (${selectedColor}, ${selectedSize}) x${quantity} added to your cart.`,
    });
    console.log('Added to cart:', {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden ${
                    mainImage === image ? 'border-crocco' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-2xl font-semibold mt-4">${product.price.toFixed(2)}</p>
            </div>
            
            <div className="space-y-6 border-t pt-6">
              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex gap-2"
                >
                  {product.colors.map((color) => (
                    <div key={color} className="flex items-center gap-2">
                      <RadioGroupItem value={color} id={`color-${color.toLowerCase()}`} className="sr-only" />
                      <Label
                        htmlFor={`color-${color.toLowerCase()}`}
                        className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center border-2 ${
                          selectedColor === color
                            ? 'border-crocco'
                            : 'border-transparent'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full bg-${color.toLowerCase() === 'green' ? 'crocco' : color.toLowerCase()}`}
                        />
                        {selectedColor === color && (
                          <Check
                            className={`absolute w-4 h-4 text-white ${
                              color.toLowerCase() === 'white' ? 'text-black' : ''
                            }`}
                          />
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              {/* Size Selection */}
              <div>
                <div className="flex justify-between mb-3">
                  <h3 className="text-sm font-medium">Size</h3>
                  <button className="text-xs text-crocco hover:underline">Size Guide</button>
                </div>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="grid grid-cols-4 gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                      <Label
                        htmlFor={`size-${size}`}
                        className={`flex h-10 items-center justify-center rounded-md border text-center cursor-pointer ${
                          selectedSize === size
                            ? 'border-2 border-crocco bg-crocco/10'
                            : 'border-gray-200'
                        }`}
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              {/* Quantity Control */}
              <div>
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center border rounded-md w-32">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= 10}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-crocco hover:bg-crocco-dark"
                >
                  <ShoppingCart size={18} className="mr-2" /> Add to Cart
                </Button>
                <Button variant="outline" className="flex-1">
                  <Heart size={18} className="mr-2" /> Wishlist
                </Button>
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">In Stock</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Out of Stock</span>
                  </>
                )}
                
                <div className="ml-auto flex items-center gap-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <p>{product.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="pt-6">
              <div className="prose max-w-none">
                <ul>
                  <li>100% organic cotton</li>
                  <li>Regular fit</li>
                  <li>Machine washable at 30°C</li>
                  <li>Made in Algeria</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Reviews feature will be available soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
