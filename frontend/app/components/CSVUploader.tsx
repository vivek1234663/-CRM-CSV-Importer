
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  UploadCloud,
  FileText,
  X,
  Loader2,
  CheckCircle,
} from "lucide-react";

import PreviewTable from "./PreviewTable";
import { uploadCSV, processCSV } from "../services/api";

export default function CSVUploader() {

  const [selectedFile,setSelectedFile] =
    useState<File | null>(null);

  const [csvData,setCsvData] =
    useState<any[]>([]);

  const [processedRows,setProcessedRows] =
    useState<any[]>([]);

  const [loading,setLoading] =
    useState(false);

  const [totalRows,setTotalRows] =
    useState(0);



  const onDrop = useCallback(
    async(files:File[])=>{

      if(!files.length) return;


      const file = files[0];


      setSelectedFile(file);
      setCsvData([]);
      setProcessedRows([]);
      setTotalRows(0);

      setLoading(true);



      try{


        const response =
          await uploadCSV(file);



        console.log(
          "Upload Response",
          response
        );



        if(response.success){

          setCsvData(
            response.preview || []
          );


          setTotalRows(
            response.totalRows || 0
          );

        }
        else{

          alert(
            response.message ||
            "CSV Upload Failed"
          );

        }


      }
      catch(error){

        console.log(error);

        alert(
          "Backend connection failed"
        );

      }
      finally{

        setLoading(false);

      }


    },
    []
  );




  const handleImport = async()=>{


    if(!csvData.length){

      alert(
        "No CSV Data Found"
      );

      return;

    }



    setLoading(true);



    try{


      const response =
        await processCSV(csvData);



      console.log(
        "AI Response",
        response
      );



      if(
        response.success &&
        Array.isArray(response.rows)
      ){

        setProcessedRows(
          response.rows
        );


      }
      else{

        alert(
          response.message ||
          "AI Mapping Failed"
        );

      }



    }
    catch(error){

      console.log(error);

      alert(
        "Import Failed"
      );

    }
    finally{

      setLoading(false);

    }


  };





  const removeFile = ()=>{

    setSelectedFile(null);
    setCsvData([]);
    setProcessedRows([]);
    setTotalRows(0);

  };





  const {
    getRootProps,
    getInputProps
  } = useDropzone({

    onDrop,

    multiple:false,

    accept:{
      "text/csv":[
        ".csv"
      ]
    }

  });





return (

<div className="min-h-screen bg-gray-50 p-8">


<div className="max-w-7xl mx-auto">



<div className="flex justify-between items-center mb-8">


<div>

<h1 className="text-3xl font-bold">
Import Leads
</h1>


<p className="text-gray-500 mt-1">
Upload CSV and convert into CRM leads
</p>


</div>



{
selectedFile &&

<button
onClick={removeFile}
className="p-2 hover:bg-gray-200 rounded-lg"
>

<X/>

</button>

}


</div>







{
!selectedFile &&
!loading &&


<div

{...getRootProps()}

className="
bg-white
border-2
border-dashed
rounded-2xl
p-20
text-center
cursor-pointer
hover:border-orange-500
"


>


<input {...getInputProps()}/>



<UploadCloud
size={60}
className="
mx-auto
text-orange-500
"
/>


<h2 className="text-2xl font-bold mt-5">

Upload CSV File

</h2>


<p className="text-gray-500 mt-2">

Drag & Drop or choose file

</p>



<button

className="
mt-6
bg-orange-500
text-white
px-8
py-3
rounded-lg
"

>

Choose CSV

</button>



</div>

}




{
loading &&


<div className="bg-white rounded-xl p-20 text-center">


<Loader2

size={55}

className="
animate-spin
mx-auto
text-orange-500
"

/>


<h2 className="text-xl font-semibold mt-5">

AI Processing...

</h2>


<p className="text-gray-500">

Mapping CSV fields with CRM

</p>



</div>


}







{
selectedFile &&
!loading &&


<div>


<div className="
bg-white
rounded-xl
border
p-5
flex
justify-between
items-center
">


<div className="flex gap-4">


<div className="
bg-orange-100
p-3
rounded-lg
">

<FileText
className="text-orange-600"
/>

</div>



<div>

<h3 className="font-semibold">

{selectedFile.name}

</h3>


<p className="text-sm text-gray-500">

{(
selectedFile.size/1024
).toFixed(2)}
KB

</p>


</div>


</div>


</div>







{
csvData.length>0 &&
processedRows.length===0 &&


<div className="mt-8">


<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="text-xl font-bold">

CSV Preview

</h2>


<span className="
bg-white
border
px-4
py-2
rounded-lg
">

Rows: {totalRows}

</span>


</div>



<PreviewTable
data={csvData}
/>



<div className="mt-6 flex justify-end">


<button

onClick={handleImport}

className="
bg-orange-500
text-white
px-8
py-3
rounded-lg
"

>

Confirm Import

</button>


</div>



</div>


}









{
processedRows.length>0 &&


<div className="mt-10">


<div className="
flex
items-center
gap-3
mb-6
">


<CheckCircle
className="text-green-600"
/>


<h2 className="text-2xl font-bold">

Leads Imported Successfully

</h2>


</div>





<div className="
bg-white
rounded-xl
border
overflow-auto
">


<table className="w-full">


<thead className="bg-gray-100">


<tr>

{
Object.keys(processedRows[0])
.map((key)=>(

<th
key={key}
className="
px-6
py-4
text-left
font-semibold
"
>

{key}

</th>


))

}

</tr>


</thead>





<tbody>


{
processedRows.map(
(row,index)=>(


<tr
key={index}
className="border-t"
>


{
Object.values(row)
.map(
(value:any,i)=>(


<td
key={i}
className="
px-6
py-4
"
>

{value || "-"}

</td>


)

)

}


</tr>


)

)

}


</tbody>


</table>


</div>





<button

onClick={removeFile}

className="
mt-6
bg-green-600
text-white
px-8
py-3
rounded-lg
"

>

Import Another CSV

</button>



</div>


}





</div>

}



</div>


</div>


);


}

