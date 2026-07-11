// components/ProgressBar.tsx

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="mt-6">
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-center text-sm">
        {progress}% Completed
      </p>
    </div>
  );
}