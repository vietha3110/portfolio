"use client"
import xpLogo from "@/image/logo.png";
import Image from "next/image";
import { useState } from "react";
import HaProfile from "@/components/HaProfile";
import LoadingBarTest from "@/components/LoadingBar";
import { useEffect } from "react";

export default function Home() {
  const [showedProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowProfile(true);   
    }, 3000);
    return () => clearTimeout(timerId);
  }, []); 
  return (
    <>
      {
        !showedProfile &&  <div className="flex items-center justify-center h-screen bg-black text-white flex-col">
          <div className="flex flex-row w-[440px] py-0 my-0">
            <div className="flex items-end">
              <h2 className="text-3xl">Ha Nguyen</h2>
            </div>
            <div className="md:w-8 w-10">
            </div>
          
          <Image src={xpLogo} alt="XP Logo" className="w-64 transform rotate-x-12" width={800} height={300} priority />
          </div>
          <div className="flex flex-row w-[440px] ">
            <h1 className="text-8xl mr-2 font-bold"> 
              Portfolio 
            </h1>
            <div><span className="text-orange-400 text-5xl">xp</span></div>  
          </div>
        
        <div className="w-1/3 mt-8 flex items-center justify-center"> 
            <LoadingBarTest/>
        </div>
        </div>
      }
      {
        showedProfile && <HaProfile/>
       }
   
      </>
  );
}
