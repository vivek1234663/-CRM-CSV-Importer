"use client";

import { useState } from "react";

interface PreviewTableProps {
  data: any[];
}

export default function PreviewTable({
  data,
}: PreviewTableProps) {

  const [currentPage, setCurrentPage] = useState(1);

  if (!data || data.length === 0) return null;


  const headers = Object.keys(data[0]);


  // Pagination
  const rowsPerPage = 10;

  const totalPages = Math.ceil(
    data.length / rowsPerPage
  );


  const startIndex = 
    (currentPage - 1) * rowsPerPage;


  const currentRows = data.slice(
    startIndex,
    startIndex + rowsPerPage
  );


  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">


      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-4">

        <div>

          <h2 className="text-xl font-semibold text-gray-900">
            CSV Preview
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Review your uploaded records before importing.
          </p>

        </div>


        <div className="rounded-lg bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 border border-orange-200">

          {startIndex + 1} -{" "}
          {Math.min(
            startIndex + rowsPerPage,
            data.length
          )}{" "}
          / {data.length} Rows

        </div>


      </div>



      {/* Table */}

      <div className="max-h-[500px] overflow-auto">


        <table className="min-w-full">


          <thead className="sticky top-0 bg-gray-50 z-20">


            <tr>


              <th
                className="
                border-b 
                px-4 
                py-3 
                text-left 
                text-xs 
                font-semibold 
                uppercase 
                text-gray-600 
                w-16
                "
              >
                #
              </th>



              {headers.map((header)=>(

                <th
                  key={header}
                  className="
                  border-b 
                  px-5 
                  py-3 
                  text-left 
                  text-xs 
                  font-semibold 
                  uppercase 
                  text-gray-600 
                  whitespace-nowrap
                  "
                >

                  {header.replace(/_/g," ")}

                </th>

              ))}



            </tr>


          </thead>



          <tbody>


            {currentRows.map((row,index)=>(


              <tr
                key={index}
                className="
                border-b 
                hover:bg-orange-50 
                transition-colors
                "
              >



                <td className="px-4 py-3 text-gray-500 font-medium">

                  {startIndex + index + 1}

                </td>



                {headers.map((header)=>(


                  <td
                    key={header}
                    className="
                    px-5 
                    py-3 
                    text-sm 
                    text-gray-700 
                    whitespace-nowrap
                    "
                  >

                    {
                      row[header]
                      ? String(row[header])
                      : "--"
                    }


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

          Page{" "}
          <span className="font-semibold">
            {currentPage}
          </span>{" "}
          of{" "}
          <span className="font-semibold">
            {totalPages}
          </span>

        </span>





        <div className="flex items-center gap-3">


          <button

            disabled={currentPage === 1}

            onClick={() =>
              setCurrentPage((prev)=>prev-1)
            }

            className="
            rounded-lg
            border
            px-4
            py-2
            disabled:opacity-50
            hover:bg-gray-100
            "
          >

            Previous

          </button>





          <button

            disabled={currentPage === totalPages}

            onClick={() =>
              setCurrentPage((prev)=>prev+1)
            }

            className="
            rounded-lg
            border
            px-4
            py-2
            disabled:opacity-50
            hover:bg-gray-100
            "
          >

            Next

          </button>



        </div>




        <span>

          Total Columns{" "}
          <span className="font-semibold">
            {headers.length}
          </span>

        </span>



      </div>



    </div>
  );
}