// import React, { useRef, useState, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { PlayIcon, PauseIcon } from 'lucide-react';
// import Agile from "../assets/cards_img/Agile.webp";
// import AWS from "../assets/cards_img/AWS.webp";
// import Devops from "../assets/cards_img/Devops.webp";
// import Fullstack from "../assets/cards_img/Fullstack.webp";
// import Photo from "../assets/cards_img/Photo.webp";
// import Sales from "../assets/cards_img/Sales.webp";

// const MultipleCard = () => {
//   const containerRef = useRef(null);
//   const { scrollXProgress } = useScroll({ container: containerRef });
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [scrollSpeed, setScrollSpeed] = useState(0.6); // Much slower scroll speed
//   const x = useTransform(scrollXProgress, [0, 1], [0, -100]);

//   // Implement true infinite scroll effect with reduced speed
//   useEffect(() => {
//     if (!containerRef.current || !isPlaying) return;
    
//     const scrollContainer = containerRef.current;
//     let scrollTimeout;
//     let frameCount = 0;
    
//     const animate = () => {
//       frameCount += scrollSpeed;
      
//       if (frameCount >= 0.1) {
//         scrollContainer.scrollLeft += Math.floor(frameCount);
//         frameCount = frameCount % 1;
//       }
      
//       const cardWidth = 320;
//       const totalContentWidth = cards.length * cardWidth;
      
//       // If we've scrolled to the end
//       if (scrollContainer.scrollLeft >= totalContentWidth) {
//         frameCount = 0.1;
//       }
      
//       scrollTimeout = requestAnimationFrame(animate);
//     };
    
//     scrollTimeout = requestAnimationFrame(animate);
    
//     return () => {
//       if (scrollTimeout) {
//         cancelAnimationFrame(scrollTimeout);
//       }
//     };
//   }, [isPlaying, scrollSpeed]);

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   // Prevent clicks on cards from interrupting scrolling
//   const handleCardClick = (e) => {
//     e.preventDefault();
//     // Don't do anything else on click
//   };

//   // Clone the first few cards and add them to the end for the infinite scroll effect
//   const clonedCards = [...cards, ...cards.slice(0, 10000)];

//   return (    
//     <div className="flex-col mb-[10vh] flex h-[50vh] justify-center items-center relative">
//       <section className="relative h-full w-full">
//         <motion.div 
//           ref={containerRef}
//           className="flex h-full items-center overflow-x-scroll scrollbar-hide"
//           style={{
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none',
//             WebkitOverflowScrolling: 'touch',
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div 
//             className="flex" 
//             onClick={(e) => e.stopPropagation()}
//           >
//             {clonedCards.map((card, index) => (
//               <Card 
//                 card={card} 
//                 key={`${card.id}-${index}`}
//                 onClick={handleCardClick}
//               />
//             ))}
//           </div>
//         </motion.div>
//       </section>
      
//       {/* Play/Pause Button */}
//       <button 
//         onClick={togglePlayPause}
//         className="absolute bottom-4 right-4 bg-gray-700/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors z-20"
//       >
//         {isPlaying ? 
//           <PauseIcon className="w-6 h-6" /> : 
//           <PlayIcon className="w-6 h-6" />
//         }
//       </button>
//     </div>
//   );
// };

// const Card = ({ card, onClick }) => {
//   return (
//     <div 
//       className="multi-cards relative h-[50vh] w-[370px] cursor-pointer"
//       onClick={onClick}
//     >
//       <div className="absolute inset-0">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: `url(${card.url})`,
//           }}
//         />
//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

//         <p className="absolute bottom-0 left-0 p-5 text-2xl font-bold text-white z-10">
//           {card.title}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MultipleCard;

// const cards = [
//   {
//     url: AWS,
//     title: "AWS Services",
//     id: 1,
//   },
//   {
//     url: Agile,
//     title: "Agile Technologies",
//     id: 2,
//   },
//   {
//     url: Fullstack,
//     title: "Full Stack Development",
//     id: 3,
//   },
//   {
//     url: Devops,
//     title: "DevOps",
//     id: 4,
//   },
//   {
//     url: Photo,
//     title: "Photography",
//     id: 5,
//   },
//   {
//     url: Sales,
//     title: "Sales & Marketing",
//     id: 6,
//   },
// ];

// // Add CSS to hide scrollbar
// const style = document.createElement('style');
// style.textContent = `
//   .scrollbar-hide::-webkit-scrollbar {
//     display: none;
//   }
//   .scrollbar-hide {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
// `;
// document.head.appendChild(style);


import React, { useState } from 'react';

// Placeholder images for demo
const Agile = "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop";
const AWS = "https://images.unsplash.com/photo-1669865015890-4dbd855de0f7?w=400&h=300&fit=crop";
const Devops = "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop";
const Fullstack = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop";
const Photo = "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop";
const Sales = "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&h=300&fit=crop";

const MultipleCard = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (    
    <div className="flex-col mb-[10vh] flex h-[50vh] justify-center items-center relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      
      <style jsx>{`
        @keyframes card-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% - 1.5rem));
          }
        }

        .animate-card-scroll {
          animation: card-scroll 25s linear infinite;
          animation-timing-function: linear;
        }

        .animation-paused {
          animation-play-state: paused;
        }

        .card-container {
          transition: all 0.3s ease;
        }
        .card-container:hover {
          transform: translateY(-5px) scale(1.02);
        }
      `}</style>

      <section className="relative h-full w-full">
        <div className="flex h-full items-center overflow-hidden">
          <div 
            className="w-full py-12"
          >
            <div className="mx-auto w-full px-4 md:px-8">
              <div
                className="group relative mt-6 flex gap-6 overflow-hidden p-2"
                style={{
                  maskImage:
                    'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                }}
              >
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`flex shrink-0 animate-card-scroll flex-row justify-around gap-6 ${!isPlaying ? 'animation-paused' : ''}`}
                    >
                      {cards.map((card, key) => (
                        <Card 
                          card={card} 
                          key={`${card.id}-${key}`}
                        />
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <button 
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 bg-gray-700/70 text-white p-3 rounded-full hover:bg-black/90 transition-all duration-300 hover:scale-110 z-20 shadow-lg font-bold text-lg"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-purple-100/25 rounded-full opacity-15 blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

const Card = ({ card }) => {
  return (
    <div className="card-container relative h-[40vh] w-[350px] cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
          style={{
            backgroundImage: `url(${card.url})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-10">
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {card.title}
          </h3>
          <div className="w-16 h-1 bg-white/80 mx-auto rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MultipleCard;

const cards = [
  {
    url: AWS,
    title: "AWS Services",
    id: 1,
  },
  {
    url: Agile,
    title: "Agile Technologies",
    id: 2,
  },
  {
    url: Fullstack,
    title: "Full Stack Development",
    id: 3,
  },
  {
    url: Devops,
    title: "DevOps",
    id: 4,
  },
  {
    url: Photo,
    title: "Photography",
    id: 5,
  },
  {
    url: Sales,
    title: "Sales & Marketing",
    id: 6,
  },
];