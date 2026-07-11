"use client";

interface MappingItem {
  csv: string;
  crm: string;
}

interface MappingCardProps {
  mapping: MappingItem[];
}

export default function MappingCard({ mapping }: MappingCardProps) {
  return (
    <div className="mt-6 bg-white border rounded-xl shadow-sm p-6">

      <h2 className="text-xl font-bold text-gray-900 mb-5">
        🤖 AI Mapping
      </h2>


      <div className="space-y-3">

        {mapping.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center 
            border-b pb-3"
          >

            <span className="text-gray-700 font-medium">
              {item.csv}
            </span>


            <span className="text-green-600 font-semibold">
              → {item.crm} ✅
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}