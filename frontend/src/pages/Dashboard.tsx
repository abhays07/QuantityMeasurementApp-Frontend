import React, { useReducer, useRef, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { CategoryPicker } from '../components/dashboard/CategoryPicker';
import { CalculatorCard } from '../components/dashboard/CalculatorCard';
import { ResultDisplay } from '../components/dashboard/ResultDisplay';
import { Alert } from '../components/common/Alert';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { useApi } from '../hooks/useApi';
import { DEFAULT_UNITS } from '../constants';
import { addQuantities, subtractQuantities, compareQuantities, convertQuantity } from '../services/api';
import type { QuantityCategory, QuantityInput } from '../types';

interface CalculatorState {
  category: QuantityCategory;
  val1: string;
  unit1: string;
  val2: string;
  unit2: string;
  calcResult: string | null;
  isEqual: boolean | null;
  operationError: string | null;
  selectedOperation: 'add' | 'subtract' | 'compare' | 'convert' | null;
}

type Action =
  | { type: 'SET_CATEGORY'; payload: QuantityCategory }
  | { type: 'SET_VAL1'; payload: string }
  | { type: 'SET_UNIT1'; payload: string }
  | { type: 'SET_VAL2'; payload: string }
  | { type: 'SET_UNIT2'; payload: string }
  | { type: 'SET_OPERATION'; payload: 'add' | 'subtract' | 'compare' | 'convert' | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_RESULT'; payload: { result: string | null; isEqual: boolean | null } };

const initialState: CalculatorState = {
  category: 'length',
  val1: '0',
  unit1: DEFAULT_UNITS.length,
  val2: '0',
  unit2: DEFAULT_UNITS.length,
  calcResult: null,
  isEqual: null,
  operationError: null,
  selectedOperation: null,
};

function calculatorReducer(state: CalculatorState, action: Action): CalculatorState {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...initialState,
        category: action.payload,
        unit1: DEFAULT_UNITS[action.payload],
        unit2: DEFAULT_UNITS[action.payload],
      };
    case 'SET_VAL1':
      return { ...state, val1: action.payload, calcResult: null, isEqual: null, operationError: null };
    case 'SET_UNIT1':
      return { ...state, unit1: action.payload, calcResult: null, isEqual: null, operationError: null };
    case 'SET_VAL2':
      return { ...state, val2: action.payload, calcResult: null, isEqual: null, operationError: null };
    case 'SET_UNIT2':
      return { ...state, unit2: action.payload, calcResult: null, isEqual: null, operationError: null };
    case 'SET_OPERATION':
      return { ...state, selectedOperation: action.payload, operationError: null, calcResult: null, isEqual: null };
    case 'SET_ERROR':
      return { ...state, operationError: action.payload, calcResult: null, isEqual: null };
    case 'SET_RESULT':
      return { ...state, calcResult: action.payload.result, isEqual: action.payload.isEqual, operationError: null };
    default:
      return state;
  }
}

const Dashboard: React.FC = () => {
  const { isLoading: authLoading } = useAuth();
  const { error: notifyError } = useNotification();
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const resultRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to result when it's displayed
  useEffect(() => {
    if ((state.calcResult || state.isEqual !== null) && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [state.calcResult, state.isEqual]);

  // API hooks
  const { execute: executeAdd, isLoading: addLoading } = useApi(addQuantities);
  const { execute: executeSubtract, isLoading: subtractLoading } = useApi(subtractQuantities);
  const { execute: executeCompare, isLoading: compareLoading } = useApi(compareQuantities);
  const { execute: executeConvert, isLoading: convertLoading } = useApi(convertQuantity);

  const isLoading = addLoading || subtractLoading || compareLoading || convertLoading;

  // Handle calculate trigger
  const handleCalculate = async () => {
    if (!state.selectedOperation) return;

    if (state.val1 === '' || state.val2 === '') {
      dispatch({ type: 'SET_ERROR', payload: 'Inputs cannot be empty' });
      return;
    }

    const numericVal1 = Number(state.val1);
    const numericVal2 = Number(state.val2);

    if (isNaN(numericVal1) || isNaN(numericVal2)) {
      dispatch({ type: 'SET_ERROR', payload: 'Inputs must be valid numbers' });
      return;
    }

    const payload: QuantityInput = {
      thisQuantityDTO: { value: numericVal1, unit: state.unit1 },
      thatQuantityDTO: { value: numericVal2, unit: state.unit2 },
    };

    try {
      if (state.selectedOperation === 'add') {
        const result = await executeAdd(payload);
        dispatch({ type: 'SET_RESULT', payload: { result: `${result.value} ${result.unit}`, isEqual: null } });
      } else if (state.selectedOperation === 'subtract') {
        const result = await executeSubtract(payload);
        dispatch({ type: 'SET_RESULT', payload: { result: `${result.value} ${result.unit}`, isEqual: null } });
      } else if (state.selectedOperation === 'compare') {
        const result = await executeCompare(payload);
        dispatch({ type: 'SET_RESULT', payload: { result: null, isEqual: result } });
      } else if (state.selectedOperation === 'convert') {
        const result = await executeConvert({ value: numericVal1, unit: state.unit1 }, state.unit2);
        dispatch({ type: 'SET_RESULT', payload: { result: `${result.value} ${result.unit}`, isEqual: null } });
      }
    } catch (error) {
      const err = error as Error;
      const message = err.message || `${state.selectedOperation} operation failed`;
      dispatch({ type: 'SET_ERROR', payload: message });
      notifyError(message);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <DashboardLayout title="Quantity Calculator">
      {/* Category Picker */}
      <CategoryPicker
        selectedCategory={state.category}
        onCategoryChange={(cat) => dispatch({ type: 'SET_CATEGORY', payload: cat })}
      />

      {/* Error Alert */}
      {state.operationError && (
        <Alert type="error" closeable onClose={() => dispatch({ type: 'SET_ERROR', payload: null })}>
          {state.operationError}
        </Alert>
      )}

      {/* Calculator Card */}
      <CalculatorCard
        category={state.category}
        val1={state.val1}
        unit1={state.unit1}
        val2={state.val2}
        unit2={state.unit2}
        isLoading={isLoading}
        selectedOperation={state.selectedOperation}
        onVal1Change={(v) => dispatch({ type: 'SET_VAL1', payload: v })}
        onUnit1Change={(u) => dispatch({ type: 'SET_UNIT1', payload: u })}
        onVal2Change={(v) => dispatch({ type: 'SET_VAL2', payload: v })}
        onUnit2Change={(u) => dispatch({ type: 'SET_UNIT2', payload: u })}
        onOperationSelect={(op) => dispatch({ type: 'SET_OPERATION', payload: op })}
        onCalculate={handleCalculate}
      />

      {/* Result Display */}
      <div ref={resultRef}>
        <ResultDisplay result={state.calcResult} isEqual={state.isEqual} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;