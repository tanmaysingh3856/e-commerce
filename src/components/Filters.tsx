import React from 'react';
import { FilterState } from '../types';
import { Sliders } from 'lucide-react';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const handleChange = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Sliders className="w-5 h-5 mr-2 text-green-600" />
        <h2 className="text-xl font-semibold">Filters</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', Number(e.target.value))}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Max"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Carbon Footprint (kg CO₂)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.maxCarbonFootprint}
            onChange={(e) => handleChange('maxCarbonFootprint', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-600">{filters.maxCarbonFootprint}kg</span>
        </div>

        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.recyclableOnly}
              onChange={(e) => handleChange('recyclableOnly', e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            <span className="ml-2 text-sm text-gray-700">Recyclable Only</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.sustainablePackagingOnly}
              onChange={(e) => handleChange('sustainablePackagingOnly', e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            <span className="ml-2 text-sm text-gray-700">Sustainable Packaging Only</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Rating
          </label>
          <select
            value={filters.minRating}
            onChange={(e) => handleChange('minRating', Number(e.target.value))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="0">Any Rating</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}+ Stars
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}