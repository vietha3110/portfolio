import Image from "next/image";
import xpLogo from "@/image/logo.png";
import Link from "next/link";
import avocado from "@/image/gif/avocado.gif"; 

export default function HaProfile() {

    return (
        <div>
            <section className="h-svh w-screen overflow-hidden bg-blue-100 radial-gradient-loading flex flex-col">
                <div className="bg-blue-600 h-1/6 border-b-1 border-amber-100">
                    
                </div>
                <div className="flex items-center justify-center h-full w-full flex-col">
                    <div className="w-[90%] relative">
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <div className="flex w-full">
                                <div className="md:flex hidden justify-end items-center w-1/2">
                                    <div className="flex flex-col mr-4">
                                        <div className="flex justify-end w-full mr-12">
                                            <div className="flex items-end mx-2 pt-4">
                                                <h2 className="text-md ">Ha Nguyen</h2>
                                            </div>
                                            <div className="w-1/3">
                                                <Image src={xpLogo} width={200} height={200} alt="logo"/>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-end">
                                            <div className="justify-end ml-4 flex flex-row">
                                                <h2 className="text-white text-5xl text-right font-semibold">Portfolio</h2>
                                                <div><span className="text-orange-50 text-md font-semibold">xp</span></div>  

                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-white text-2xl text-right font-semibold mr-4 mt-8">To begin, click to Ha</h3>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="w-px h-96 line-loading-gradient mx-3 md:flex"
                                    style={{backgroundImage:"linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .48) 49.48%, rgba(255, 255, 255, 0) 100%" }}
                                >
                                </div>
                                <div className="flex items-center ml-8">
                                    <div className="absolute h-28 md:w-7/12 w-screen">
                                        <div className="flex flex-row">
                                            <Link href="/home" className="h-full w-full rounded-xl">
                
                                                <div className="w-full flex justify-start text-orange gap-4 relative outline-none">
                                                    <div>
                                                        <div className="rounded-lg border-2 border-orange-50 bg-orange-50 shadow-amber-100 bg-no-repeat bg-cover bg-center w-16 h-16 stroke-yellow-2 flex items-center justify-center">
                                                            <Image src={avocado} alt="gif avatar" height={40} width={40}/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h2 className="text-xl md:text-2xl text-white">
                                                            Ha
                                                        </h2>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>
                <div className="bg-blue-600 w-full h-1/6  up-stroke-green-2 border-t-1 border-t-orange-50">               
                        <div className="flex justify-center items-center h-full">
                            <div className="w-[90%]">
                                <div className="flex justify-between items-center md:gap-8 gap-8">
                                    <div className="relative inline-block text-left text-white md:text-xl text-sm">
                                        <div className="flex items-center md:gap-3 gap-2 cursor-pointer">
                                            <Image src={xpLogo} alt="Langue English" className="md:w-12 w-9" />
                                            <button className="inline-flex justify-center items-center w-full focus:outline-none font-franklin">English </button>
                                        </div>
                                    </div>
                                    <div className="flex text-white md:text-sm text-xs font-bold md:mr-10 md:w-2/6">
                                        <h4>
                                        After logging in, you can browse through the folders on my computer. Go to the desktop and click on the projects folder to see all my resume and other stuffs.
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </div>
    )
}
