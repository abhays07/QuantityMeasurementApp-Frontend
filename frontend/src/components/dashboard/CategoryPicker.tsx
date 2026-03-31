import React from 'react';
import { UNIT_CATEGORIES } from '../../constants';
import type { QuantityCategory } from '../../types';

interface CategoryPickerProps {
  selectedCategory: QuantityCategory;
  onCategoryChange: (category: QuantityCategory) => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = Object.keys(UNIT_CATEGORIES) as QuantityCategory[];

  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="text-sm font-semibold text-slate-700 mb-3">
        Select Measurement Category
      </legend>
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            aria-label={`Select ${cat} category`}
            aria-current={selectedCategory === cat ? 'true' : undefined}
            className={`px-6 py-2 rounded-full font-bold capitalize transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'bg-white text-slate-500 border-2 border-slate-200 hover:border-blue-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </fieldset>
  );
};

CategoryPicker.displayName = 'CategoryPicker';
