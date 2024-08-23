import Image from "next/image";
import Link from "next/link";
import { Star } from 'lucide-react';

const Navbar = () => {
    return ( 
        <div className="flex flex-row h-16 items-center justify-around">
            <div>
                <Image src={'/logoipsum-281.svg'} alt="logo" width={24} height={24}/>
            </div>
            <div>
                <a href="/">
                <h1 className="font-medium text-sm">
                    PlayPdf
                </h1>
                </a>
            </div>
            <div>
                <Link href={"https://github.com/BeNikk/pdf"}>
                <Star className="w-5 h-5"/>
                </Link>
            </div>

           

        </div>
     );
}
 
export default Navbar;