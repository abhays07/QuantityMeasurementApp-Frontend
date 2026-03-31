import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { QuantityInput } from './QuantityInput';
import type { QuantityCategory } from '../../types';

interface CalculatorCardProps {
  category: QuantityCategory;
  val1: string;
  unit1: string;
  val2: string;
  unit2: string;
  isLoading?: boolean;
  selectedOperation: 'add' | 'subtract' | 'compare' | 'convert' | null;
  onVal1Change: (value: string) => void;
  onUnit1Change: (unit: string) => void;
  onVal2Change: (value: string) => void;
  onUnit2Change: (unit: string) => void;
  onOperationSelect: (op: 'add' | 'subtract' | 'compare' | 'convert') => void;
  onCalculate: () => void;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  category,
  val1,
  unit1,
  val2,
  unit2,
  isLoading = false,
  selectedOperation,
  onVal1Change,
  onUnit1Change,
  onVal2Change,
  onUnit2Change,
  onOperationSelect,
  onCalculate,
}) => {
  // Temperature doesn't support add/subtract
  const supportsArithmetic = category !== 'temperature';

  return (
    <Card className="border-2">
      <h3 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-widest text-center">
        Quantity Calculator
      </h3>

      {/* Operation Selection Top Bar */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-10 bg-slate-100 p-2 rounded-xl" role="group" aria-label="Calculator operations">
        {supportsArithmetic && (
          <>
            <button
              onClick={() => onOperationSelect('add')}
              aria-label="Add quantities"
              aria-pressed={selectedOperation === 'add'}
              className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm uppercase transition-all ${
                selectedOperation === 'add'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-blue-50'
              }`}
            >
              Add (+)
            </button>
            <button
              onClick={() => onOperationSelect('subtract')}
              aria-label="Subtract quantities"
              aria-pressed={selectedOperation === 'subtract'}
              className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm uppercase transition-all ${
                selectedOperation === 'subtract'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-200'
              }`}
            >
              Subtract (-)
            </button>
          </>
        )}
        <button
          onClick={() => onOperationSelect('convert')}
          aria-label="Convert units"
          aria-pressed={selectedOperation === 'convert'}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm uppercase transition-all ${
            selectedOperation === 'convert'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-teal-50'
          }`}
        >
          Convert (→)
        </button>
        <button
          onClick={() => onOperationSelect('compare')}
          aria-label="Compare quantities"
          aria-pressed={selectedOperation === 'compare'}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm uppercase transition-all ${
            selectedOperation === 'compare'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-indigo-50'
          }`}
        >
          Compare (=)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-2">
        <QuantityInput
          label="First Quantity"
          value={val1}
          unit={unit1}
          category={category}
          onValueChange={onVal1Change}
          onUnitChange={onUnit1Change}
        />
        <QuantityInput
          label="Second Quantity"
          value={val2}
          unit={unit2}
          category={category}
          onValueChange={onVal2Change}
          onUnitChange={onUnit2Change}
        />
      </div>


      {!supportsArithmetic && (
        <p className="text-sm text-amber-600 mt-4 p-3 bg-amber-50 rounded-lg text-center font-medium">
          ℹ️ Temperature only supports comparison or conversion.
        </p>
      )}

      {/* Calculate Action */}
      <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={onCalculate}
          isLoading={isLoading}
          disabled={!selectedOperation || !val1 || !val2}
          className="w-full md:w-auto md:min-w-[250px] uppercase tracking-widest shadow-lg"
        >
          Get Result
        </Button>
      </div>
    </Card>
  );
};

CalculatorCard.displayName = 'CalculatorCard';
