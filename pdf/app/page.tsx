import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from 'lucide-react';
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-20 mb-4">
    <div className="flex flex-col items-center gap-12 justify-center ">
      <div>
        <h1 className="text-4xl md:text-6xl">
          Introducing PlayPDF
        </h1>
      </div>
      <div>
        <Link href={"/generate"}>
      <Button className="rounded-full">Try PlayPdf <ArrowUpRight/></Button>
        </Link>
      </div>
      <div className="mx-4 px-2 mt-8 max-w-[800px]">
            <div className="flex flex-col items-center justify-center">
             <div>
              <p className="text-lg md:text-xl text-left ">
             Man, creating practical files is a straight-up grind. I mean, it&apos;s ugly as hell—just mind-numbing copy-paste bullshit, over and over again. You sit there, smashing Ctrl+C and Ctrl+V like a damn robot, trying to piece together some Frankenstein&apos;s monster of a document. Fuck that noise! Who&apos;s got time for that shit?
              </p>


             </div>
             <div className="mt-4">
              <p className="text-lg md:text-xl text-left">
             But guess what? I&apos;m flipping the script on this boring-ass chore. All you gotta do now is drop the aim, and boom—my app handles the rest. No more wasting time on that tedious crap. Just enter the aim, and I got you covered with a full-blown practical file. It&apos;s like magic, but with less bullshit and way more awesome.
              </p>
             </div>
              </div>         
                
      </div>
      
    </div>
    </div>
  );
}
