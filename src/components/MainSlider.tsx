// 'use client'; // Directive for Next.js App Router

// import React, { useState, useEffect, useRef, FC, JSX } from 'react';


// interface MainSliderSegmentProps {
//   isActive: boolean;
//   isFirstInBlock: boolean;
//   isLastInBlock: boolean;
//   isLastOverall: boolean;
// }

// const MainSliderSegment: FC<MainSliderSegmentProps> = ({
//   isActive,
//   isFirstInBlock,
//   isLastInBlock,
//   isLastOverall,
// }) => {
//   let segmentClasses = "h-7 flex-grow transition-colors duration-100 ease-linear ";

//   if (isActive) {
//     segmentClasses += "bg-[#8ABBED] ";
//     if (isFirstInBlock && isLastInBlock) {
//       segmentClasses += "rounded-md ";
//     } else if (isFirstInBlock) {
//       segmentClasses += "rounded-l-md ";
//     } else if (isLastInBlock) {
//       segmentClasses += "rounded-r-md ";
//     }
//   } else {
//     // segmentClasses += "bg-slate-600 ";
//   }

//   if (!isLastOverall) {
//     segmentClasses += "mr-[3px] ";
//   }

//   return <div className={segmentClasses.trim()}></div>;
// };

// // Props for MainSlider
// interface MainSliderProps {
//   totalSegments?: number;
//   animationDuration?: number;
//   activeBlockSize?: number;
//     onComplete?: () => void;
// }

// // MainSlider: The main component that animates the loading bar.
// const MainSlider: FC<MainSliderProps> = ({
//   totalSegments = 12,
//   animationDuration = 5000,
//   activeBlockSize = 3,
//     onComplete,
// }) => {
//   const [currentPosition, setCurrentPosition] = useState<number>(-activeBlockSize + 1);
//   const animationFrameId = useRef<number | null>(null);
//   const startTimeRef = useRef<number | null>(null);

//   useEffect(() => {
//     const animationSteps: number = totalSegments + activeBlockSize - 1;
//     const timePerStep: number = animationDuration / animationSteps;

//     const animate = (timestamp: number) => {
//       if (!startTimeRef.current) {
//         startTimeRef.current = timestamp;
//       }
//       const elapsedTime: number = timestamp - startTimeRef.current;
//       const nextPosition: number = Math.min(
//         totalSegments -1 , // Corrected: ensure block doesn't go entirely past the end
//         Math.floor(elapsedTime / timePerStep) - activeBlockSize + 1
//       );

//       setCurrentPosition(nextPosition);

//       if (elapsedTime < animationDuration) {
//         animationFrameId.current = requestAnimationFrame(animate);
//       } else {
//         setCurrentPosition(totalSegments -1); // Ensure it finishes at the end
//         if (onComplete) {
//           onComplete();
//         }
//       }
//     };

//     animationFrameId.current = requestAnimationFrame(animate);

//     return () => {
//       if (animationFrameId.current) {
//         cancelAnimationFrame(animationFrameId.current);
//       }
//       startTimeRef.current = null;
//     };
//   }, [totalSegments, animationDuration, activeBlockSize, onComplete]);

//   const segmentsToRender: JSX.Element[] = [];
//   for (let i = 0; i < totalSegments; i++) {
//     const isSegmentActive: boolean = i >= currentPosition && i < currentPosition + activeBlockSize;
//     const isVisuallyFirstActive: boolean = i === currentPosition;
//     const isVisuallyLastActive: boolean = i === currentPosition + activeBlockSize - 1;

//     segmentsToRender.push(
//       <MainSliderSegment
//         key={i}
//         isActive={isSegmentActive}
//         isFirstInBlock={isVisuallyFirstActive && isSegmentActive}
//         isLastInBlock={isVisuallyLastActive && isSegmentActive}
//         isLastOverall={i === totalSegments - 1}
//       />
//     );
//   }

//   return (
     
//             <div className="w-full max-w-sm mx-auto">
//               <div className="flex w-full p-[3px] rounded-lg border-2 border-white shadow-md">
//                 {segmentsToRender}
//               </div>
//             </div>
        
//   );
  
// };
// export default MainSlider;
"use client"
import React, { useState, useEffect } from 'react';

// WindowsXPLoadingBar Component
// This component renders the XP-style loading bar.
const LoadingBar = () => {
  // Configuration for the loading bar's appearance and animation
  const NUM_TOTAL_SEGMENTS = 20; // Total number of segments/slots in the bar
  const NUM_ACTIVE_SEGMENTS = 4; // Number of blue segments visible at a time
  const ANIMATION_SPEED_MS = 150; // Speed of the animation in milliseconds


    const [currentStartSegment, setCurrentStartSegment] = useState(0);


    useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the starting segment, wrapping around to the beginning if it reaches the end
      setCurrentStartSegment(prev => (prev + 1) % NUM_TOTAL_SEGMENTS);
    }, ANIMATION_SPEED_MS);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [NUM_TOTAL_SEGMENTS, ANIMATION_SPEED_MS]); // Dependencies for the effect

  return (
   
    <div className="w-[204px] h-[22px] bg-[#f0f0f0] p-[2px] rounded-[3px] border border-[#a0a0a0] shadow-inner">
     
      <div className="flex w-full h-full items-center space-x-[2px]">
        {/* Generate each segment of the loading bar */}
        {Array.from({ length: NUM_TOTAL_SEGMENTS }).map((_, index) => {
          let isActive = false;
          
          for (let i = 0; i < NUM_ACTIVE_SEGMENTS; i++) {
            if ((currentStartSegment + i) % NUM_TOTAL_SEGMENTS === index) {
              isActive = true;
              break;
            }
          }

          return (
           
            <div
              key={index}
              className={`h-[12px] flex-1 ${
                isActive ? 'bg-[#0058E4]' : 'bg-[#f0f0f0]'
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingBar;
