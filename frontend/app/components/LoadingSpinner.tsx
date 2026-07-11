// components/LoadingSpinner.tsx

import { Loader2, Sparkles } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">

      {/* Spinner */}

      <div className="relative">

        <div className="h-20 w-20 rounded-full border-4 border-blue-100"></div>

        <Loader2
          className="absolute inset-0 m-auto h-20 w-20 animate-spin text-blue-600"
          strokeWidth={2}
        />

      </div>

      {/* AI Badge */}

      <div className="mt-6 flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700">

        <Sparkles size={18} />

        <span className="text-sm font-medium">
          AI Processing CSV...
        </span>

      </div>

      {/* Heading */}

      <h3 className="mt-5 text-xl font-semibold text-gray-800">
        Importing your data
      </h3>

      {/* Description */}

      <p className="mt-2 max-w-md text-center text-sm text-gray-500">
        Please wait while our AI analyzes your CSV file,
        validates the data, and prepares it for GrowEasy CRM.
      </p>

      {/* Progress Bar */}

      <div className="mt-6 h-2 w-72 overflow-hidden rounded-full bg-gray-200">

        <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-600"></div>

      </div>

      <p className="mt-3 text-xs text-gray-400">
        This usually takes a few seconds...
      </p>

    </div>
  );
}