import Image from "next/image";

const Navbar = () => {
    return ( 
        <div className="flex flex-row items-center justify-around h-16">
            <div className="flex flex-row items-center gap-2">
            <Image src={'/logoipsum-282.svg'} height={24} width={24} alt="logo"/>
            <h1 className="font-medium font-mono text-md">PDF</h1>
            </div>
            <div>

            </div>

        </div>
     );
}
 
export default Navbar;