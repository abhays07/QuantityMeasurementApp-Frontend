import React from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { UNIT_CATEGORIES } from '../../constants';
import type { QuantityCategory } from '../../types';

interface QuantityInputProps {
  value: string;
  unit: string;
  category: QuantityCategory;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
  label?: string;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  unit,
  category,
  onValueChange,
  onUnitChange,
  label = 'Quantity',
}) => {
  const units = UNIT_CATEGORIES[category]?.units || [];
  const unitOptions = units.map((u: string) => ({ value: u, label: u }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text = e.target.value;
    
    // Allow only digits, optional minus sign at start, and optional single decimal point
    if (!/^-?\d*\.?\d*$/.test(text) && text !== '') {
      return;
    }

    // Remove leading zeros before non-decimals (056 -> 56, -007 -> -7, but keep 0, 0.5, -0.5)
    text = text.replace(/^(-?)0+(?=\d)/, '$1');

    onValueChange(text);
  };

  return (
    <div className="space-y-4">
      <Input
        label={label}
        type="text"
        value={value}
        onChange={handleInputChange}
        className="text-2xl md:text-4xl font-bold"
      />
      <Select
        label="Unit"
        value={unit}
        onChange={(e) => onUnitChange(e.target.value)}
        options={unitOptions}
      />
    </div>
  );
};

QuantityInput.displayName = 'QuantityInput';
