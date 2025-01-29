import React, { useContext } from 'react';
import { Star, Recycle, Box, Leaf } from 'lucide-react';
import { Product } from '../types';
import { CartContext } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.sustainablePackaging && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <Box className="w-3 h-3 mr-1" />
            Eco Package
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? 'fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">{product.rating}/5</span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          {product.recyclable && (
            <span className="inline-flex items-center text-green-600 text-sm">
              <Recycle className="w-4 h-4 mr-1" />
              Recyclable
            </span>
          )}
          <span className="inline-flex items-center text-green-600 text-sm">
            <Leaf className="w-4 h-4 mr-1" />
            {product.carbonFootprint}kg CO₂
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}