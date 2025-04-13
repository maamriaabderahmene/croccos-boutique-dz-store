
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';

// Sample product data
const allProducts = [
  {
    id: 1,
    name: "Classic Green T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1400&auto=format&fit=crop",
    category: "tshirts",
    subcategory: "classic",
    colors: ["green"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 2,
    name: "Crocco Cap",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1400&auto=format&fit=crop",
    category: "accessories",
    subcategory: "caps",
    colors: ["black"],
    sizes: ["one-size"],
  },
  {
    id: 3,
    name: "Urban Hoodie",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1400&auto=format&fit=crop",
    category: "hoodies",
    subcategory: "urban",
    colors: ["gray"],
    sizes: ["M", "L", "XL"],
    isSale: true,
  },
  {
    id: 4,
    name: "Premium Logo T-Shirt",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1400&auto=format&fit=crop",
    category: "tshirts",
    subcategory: "premium",
    colors: ["white"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 5,
    name: "Sport T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?q=80&w=1400&auto=format&fit=crop",
    category: "tshirts",
    subcategory: "sport",
    colors: ["blue"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 6,
    name: "Leather Belt",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1611911813383-67769b37a149?q=80&w=1400&auto=format&fit=crop",
    category: "accessories",
    subcategory: "belts",
    colors: ["brown"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 7,
    name: "Casual Backpack",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1400&auto=format&fit=crop",
    category: "accessories",
    subcategory: "bags",
    colors: ["green"],
    sizes: ["one-size"],
    isNew: true,
  },
  {
    id: 8,
    name: "Zip-Up Hoodie",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1400&auto=format&fit=crop",
    category: "hoodies",
    subcategory: "zipup",
    colors: ["black"],
    sizes: ["S", "M", "L", "XL"],
  },
];

// Category titles mapping
const categoryTitles: Record<string, string> = {
  tshirts: "T-Shirts",
  accessories: "Accessories",
  hoodies: "Hoodies",
  caps: "Caps",
};

// Available filters
const availableColors = ["black", "white", "green", "blue", "gray", "brown"];
const availableSizes = ["S", "M", "L", "XL", "one-size"];

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<typeof allProducts>([]);
  const [filters, setFilters] = useState({
    colors: [] as string[],
    sizes: [] as string[],
    priceRange: [0, 100] as [number, number],
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const categoryTitle = categoryId ? (categoryTitles[categoryId] || categoryId) : "Products";
  
  useEffect(() => {
    // Filter products based on category
    const filtered = allProducts.filter(product => 
      !categoryId || product.category === categoryId
    );
    setProducts(filtered);
    
    // Reset filters when category changes
    setFilters({
      colors: [],
      sizes: [],
      priceRange: [0, 100],
    });
  }, [categoryId]);
  
  const applyFilters = () => {
    let filtered = allProducts.filter(product => 
      (!categoryId || product.category === categoryId) && 
      (filters.colors.length === 0 || filters.colors.some(color => product.colors.includes(color))) &&
      (filters.sizes.length === 0 || filters.sizes.some(size => product.sizes.includes(size))) &&
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    setProducts(filtered);
    setIsMobileFilterOpen(false);
  };
  
  const resetFilters = () => {
    setFilters({
      colors: [],
      sizes: [],
      priceRange: [0, 100],
    });
    
    const filtered = allProducts.filter(product => 
      !categoryId || product.category === categoryId
    );
    setProducts(filtered);
  };
  
  const toggleColorFilter = (color: string) => {
    setFilters(prev => {
      const isSelected = prev.colors.includes(color);
      return {
        ...prev,
        colors: isSelected 
          ? prev.colors.filter(c => c !== color) 
          : [...prev.colors, color]
      };
    });
  };
  
  const toggleSizeFilter = (size: string) => {
    setFilters(prev => {
      const isSelected = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: isSelected 
          ? prev.sizes.filter(s => s !== size) 
          : [...prev.sizes, size]
      };
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold">{categoryTitle}</h1>
          <p className="text-muted-foreground mt-2">
            {products.length} products found
          </p>
        </div>
        
        <div className="md:grid md:grid-cols-4 md:gap-6">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <Button
              variant="outline"
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal size={16} />
              Filter Products
            </Button>
          </div>
          
          {/* Mobile Filters */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-white z-50 p-4 overflow-auto animate-fade-in md:hidden">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  onClick={() => setIsMobileFilterOpen(false)}
                  size="icon"
                >
                  <X size={24} />
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Colors */}
                <div>
                  <h3 className="font-medium mb-4">Colors</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {availableColors.map(color => (
                      <div key={color} className="flex items-center">
                        <Checkbox
                          id={`color-${color}`}
                          checked={filters.colors.includes(color)}
                          onCheckedChange={() => toggleColorFilter(color)}
                        />
                        <Label htmlFor={`color-${color}`} className="ml-2 capitalize">
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sizes */}
                <div>
                  <h3 className="font-medium mb-4">Sizes</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {availableSizes.map(size => (
                      <div key={size} className="flex items-center">
                        <Checkbox
                          id={`size-${size}`}
                          checked={filters.sizes.includes(size)}
                          onCheckedChange={() => toggleSizeFilter(size)}
                        />
                        <Label htmlFor={`size-${size}`} className="ml-2 uppercase">
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Apply/Reset Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={applyFilters}
                    className="flex-1 bg-crocco hover:bg-crocco-dark"
                  >
                    Apply Filters
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="flex-1"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop Filters */}
          <div className="hidden md:block md:col-span-1">
            <div className="space-y-6 sticky top-24">
              <Accordion type="single" collapsible defaultValue="price">
                {/* Price Range */}
                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 100]}
                        max={100}
                        step={1}
                        value={filters.priceRange}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Colors */}
                <AccordionItem value="colors">
                  <AccordionTrigger>Colors</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2">
                      {availableColors.map(color => (
                        <div key={color} className="flex items-center">
                          <Checkbox
                            id={`desktop-color-${color}`}
                            checked={filters.colors.includes(color)}
                            onCheckedChange={() => toggleColorFilter(color)}
                          />
                          <Label htmlFor={`desktop-color-${color}`} className="ml-2 capitalize">
                            {color}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Sizes */}
                <AccordionItem value="sizes">
                  <AccordionTrigger>Sizes</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2">
                      {availableSizes.map(size => (
                        <div key={size} className="flex items-center">
                          <Checkbox
                            id={`desktop-size-${size}`}
                            checked={filters.sizes.includes(size)}
                            onCheckedChange={() => toggleSizeFilter(size)}
                          />
                          <Label htmlFor={`desktop-size-${size}`} className="ml-2 uppercase">
                            {size}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  onClick={applyFilters}
                  className="w-full bg-crocco hover:bg-crocco-dark"
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="md:col-span-3">
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium">No products found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
