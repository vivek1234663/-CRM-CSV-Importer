"use client";

import { CheckCircle } from "lucide-react";

interface AnalyzeResultsProps {
  data: any[];
}

export default function AnalyzeResults({
  data,
}: AnalyzeResultsProps) {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  const imported = data.length;
  const skipped = 0; // Backend se skipped records aaye to update kar dena

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-green-100 p-2">

            <CheckCircle
              className="text-green-600"
              size={22}
            />

          </div>

          <div>

            <h2 className="text-xl font-semibold text-gray-900">
              Import Complete
            </h2>

            <p className="text-sm text-gray-500">
              AI successfully converted your CSV into CRM records.
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <div className="rounded-lg border bg-green-50 px-4 py-2">

            <p className="text-xs text-gray-500">
              Imported
            </p>

            <h3 className="font-bold text-green-700">
              {imported}
            </h3>

          </div>

          <div className="rounded-lg border bg-red-50 px-4 py-2">

            <p className="text-xs text-gray-500">
              Skipped
            </p>

            <h3 className="font-bold text-red-600">
              {skipped}
            </h3>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="max-h-[520px] overflow-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-gray-50">

            <tr>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase border-b w-16">
                #
              </th>

              {headers.map((header) => (

                <th
                  key={header}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap border-b"
                >
                  {header.replace(/_/g, " ")}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {data.map((row, index) => (

              <tr
                key={index}
                className="border-b hover:bg-green-50 transition"
              >

                <td className="px-4 py-3 text-gray-500">
                  {index + 1}
                </td>

                {headers.map((header) => (

                  <td
                    key={header}
                    className="px-5 py-3 whitespace-nowrap text-sm text-gray-700"
                  >
                    {row[header]
                      ? String(row[header])
                      : "--"}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t px-6 py-4 text-sm text-gray-500">

        <span>
          Imported Records :
          <span className="font-semibold ml-1">
            {imported}
          </span>
        </span>

        <span>
          Skipped Records :
          <span className="font-semibold ml-1">
            {skipped}
          </span>
        </span>

      </div>

    </div>
  );
}