"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Loader from "@/components/Loader";

export default function ExperimentGenerator() {
  const [aim, setAim] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading,setLoading]=useState(false);

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
        console.log(error);
        setLoading(false);
        
    }finally{
        setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContents = document.getElementById('printableArea')!.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div className="mt-20 flex flex-col items-center gap-6 justify-center">
        {loading && <Loader/>}

      <div className="w-full noprint max-w-lg">
        <input
          type="text"
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the aim of your experiment..."
          value={aim}
          onChange={(e) => setAim(e.target.value)}
        />
      </div>
      <Button className="noprint rounded-full" onClick={handleGenerate}>
        Generate <ArrowUpRight />
      </Button>

      {result && (
        <div id="printableArea" className="mt-8 w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Experiment</h2>
          
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
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{result.fullCode}</code>
            </pre>
          </div>
          
          {/* Viva Questions Section */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Viva Questions:</h3>
            <ul className="list-disc pl-5">
              {result.VivaQuestionsWithAnswers.map((qa:any, index:number) => (
                <li key={index} className="mb-2">{qa}</li>
              ))}
            </ul>
          </div>
          <div className="noprint">

          <Button className="mt-6 rounded-full" onClick={handlePrint}>
            Print as PDF
          </Button>

          </div>
        </div>
      )}
    </div>
  );
}
