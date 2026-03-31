import React from 'react';

interface ResultDisplayProps {
  result: string | null;
  isEqual: boolean | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  isEqual,
}) => {
  if (!result && isEqual === null) {
    return (
      <div className="mt-8 p-12 bg-white/50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <p className="font-medium text-sm">Select an operation to generate a result</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl text-center border-2 border-blue-200 animate-in fade-in zoom-in duration-300">
      <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">
        Calculation Result
      </p>

      {result && (
        <div>
          <h4 className="text-4xl font-black text-blue-700">{result}</h4>
          <p className="text-sm text-blue-600 mt-2">Operation completed successfully</p>
        </div>
      )}

      {isEqual !== null && (
        <div>
          {isEqual ? (
            <div>
              <h4 className="text-3xl font-black text-green-600 mb-1">✓ MATCHING</h4>
              <p className="text-sm text-green-600">The quantities are equal</p>
            </div>
          ) : (
            <div>
              <h4 className="text-3xl font-black text-orange-600 mb-1">✗ NOT MATCHING</h4>
              <p className="text-sm text-orange-600">The quantities are different</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ResultDisplay.displayName = 'ResultDisplay';
