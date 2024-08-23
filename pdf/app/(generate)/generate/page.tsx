"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Loader from "@/components/Loader";

export default function ExperimentGenerator() {
  const [aim, setAim] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
        setLoading(true);
        const dataToSend = { prompt: aim };
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
    
        const data = await response.json();
        setResult(data.practicalFile);
        
    } catch (error) {
        console.log("error");
        
    } finally {
        setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContents = document.getElementById('printableArea')!.innerHTML;
    const originalContents = document.body.innerHTML;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow!.document.open();
    printWindow!.document.write(`
      <html>
        <head>
          <style>
            @media print {
              body {
                background-color: #f0f0f0; /* Background color for the entire page */
                color: #000; /* Text color for readability */
                margin: 0;
                padding: 0;
              }
              #experiment{
              text-align: center;
              margin:0;
              padding-bottom:10px;
              }

              #printableArea {
                background-color: #fff; /* Background color for printable area */
                padding: 20px; /* Optional padding for the printable area */
                margin: 20px auto; /* Center the printable area horizontally */
                width: 80%; /* Adjust width to fit well on the page */
                max-width: 800px; /* Maximum width to prevent excessive stretching */
                box-sizing: border-box;
                border: 1px solid #ddd; /* Border for better visibility */
                border-radius: 8px; /* Optional rounded corners */
              }

              .hide-print {
                display: none; /* Hide elements that should not be printed */
              }

              pre {
                white-space: pre-wrap; /* Ensure code wraps */
                word-wrap: break-word; /* Handle long lines */
                background-color: #f7f7f7; /* Background color for the code area */
                padding: 10px; /* Optional padding */
                border: 1px solid #ddd; /* Border for better visibility */
                overflow: hidden; /* Hide overflow to avoid scrollbars */
              }

              @page {
                size: auto;
                margin: 20mm; /* Margin for printed pages */
              }
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow!.document.close();
    printWindow!.focus();
    printWindow!.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div className="mt-20 flex flex-col items-center gap-6 justify-center">
      {loading && <Loader/>}
      <div className="mx-2 w-full max-w-lg hide-print">
        <input
          type="text"
          className="ml-4 w-[90%] text-center p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the aim of your experiment..."
          value={aim}
          onChange={(e) => setAim(e.target.value)}
        />
      </div>
      <Button className="rounded-full hide-print" onClick={handleGenerate}>
        Generate <ArrowUpRight />
      </Button>

      {result && (
        <div id="printableArea" className="mt-8 w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center" id="experiment">Experiment</h2>
          
          {/* Aim Section */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Aim:</h3>
            <p className="text-sm">{result.aimOfTheExperiment}</p>
          </div>

          {/* Theory Section */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Theory:</h3>
            <ol className="list-decimal pl-5">
              {result.theoryOfTheExperimentInDetailedPoints.map(
                (step: string, index: number) => (
                  <li key={index} className="mb-2">{step}</li>
                )
              )}
            </ol>
          </div>
          
          {/* Algorithm Section */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Algorithm:</h3>
            <ol className="list-decimal pl-5">
              {result.FullAlgorithmExplainInSteps.map(
                (step: string, index: number) => (
                  <li key={index} className="mb-2">{step}</li>
                )
              )}
            </ol>
          </div>

          {/* Code Section */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Code:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              <code>{result.fullCode}</code>
            </pre>
          </div>
          
          {/* Viva Questions Section */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Viva Questions:</h3>
            <ul className="list-disc pl-5">
              {result.VivaQuestionsWithAnswers.map((qa:any, index:any) => (
                <li key={index} className="mb-2">{qa}</li>
              ))}
            </ul>
          </div>

          <Button className="mt-6 rounded-full hide-print" onClick={handlePrint}>
            Print as PDF
          </Button>
        </div>
      )}
    </div>
  );
}
