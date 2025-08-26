import React, { useState, useEffect, useRef } from 'react';
import CourseCards from './CourseCards';

const CourseHeader = () => {
  // Default headers used as fallback
  const defaultHeaders = [
    { title: "AWS Services", id: 1 },
    { title: "UI/UX Design", id: 2 },
    { title: "Full Stack Development", id: 3 },
    { title: "DV Tools", id: 4 },
    { title: "Photography", id: 5 },
    { title: "Backend Development", id: 6 },
    { title: "Machine Learning", id: 7 },
  ];

  const [headers, setHeaders] = useState(defaultHeaders);
  const [isHeaderLoading, setIsHeaderLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [activeHeader, setActiveHeader] = useState(null);
  const [activeHeaderName, setActiveHeaderName] = useState("");
  const [visibleItemCount, setVisibleItemCount] = useState(4);
  const headerContainerRef = useRef(null);

  // Update visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setVisibleItemCount(5);
      } else if (width >= 1024) {
        setVisibleItemCount(4);
      } else if (width >= 768) {
        setVisibleItemCount(3);
      } else {
        setVisibleItemCount(2);
      }
    };

    // Fetch course categories
    const fetchCourseCategories = async () => {
      setIsHeaderLoading(true);
      try {
        const response = await fetch('https://wb132r23-8000.inc1.devtunnels.ms/categories');
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          // Format the server response into our header structure
          const formattedHeaders = data.map((category, index) => ({
            title: category,
            id: index + 1
          }));

          setHeaders(formattedHeaders);
          
          // Set the first category as active by default
          if (formattedHeaders.length > 0) {
            setActiveHeader(formattedHeaders[0].id);
            setActiveHeaderName(formattedHeaders[0].title);
          }
        } else {
          throw new Error("Invalid data format from server");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to default headers
        setHeaders(defaultHeaders);
        setActiveHeader(defaultHeaders[0].id);
        setActiveHeaderName(defaultHeaders[0].title);
      } finally {
        setIsHeaderLoading(false);
      }
    };

    // Set initial value
    handleResize();
    fetchCourseCategories();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => {
      if (prevIndex === 0) {
        return headers.length - 1;
      }
      return prevIndex - 1;
    });
  };
  
  const handleNextClick = () => {
    setStartIndex((prevIndex) => {
      if (prevIndex >= headers.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const getVisibleHeaders = () => {
    const visibleHeaders = [];
    
    for (let i = 0; i < visibleItemCount; i++) {
      const index = (startIndex + i) % headers.length;
      visibleHeaders.push(headers[index]);
    }
    return visibleHeaders;
  };

  const handleHeaderClick = (header) => {
    setActiveHeader(header.id);
    setActiveHeaderName(header.title);
  };

  const HeaderItem = ({ header }) => {
    const isActive = activeHeader === header.id;
    
    return (
      <div 
        className={`flex-shrink-0 flex-grow flex items-center justify-center font-bold h-full px-1 md:px-4 py-3 text-center 
                   ${isActive ? 'text-gray-900 border-b-[4px] border-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'} 
                   transition-all duration-200 ease-out cursor-pointer`}
        onClick={() => handleHeaderClick(header)}
        style={{ width: `${100 / visibleItemCount}%` }}
      >
        <h2 className="text-sm md:text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis">{header.title}</h2>
      </div>
    );
  };

  return (
      <div className="flex flex-col w-full bg-white mb-8">
        {/* Header section */}
        <div className="w-full max-w-7xl mx-auto px-4 pt-12 pb-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
          <span className="text-black">Build a </span>
          <span className="text-blue-600">better future</span>
          <span className="text-black"> with the </span>
          <span className="text-yellow-400">right skills</span>
        </h1>
        
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
          Gain the in-demand skills you need to enter a new field, change direction, or climb the ladder with our 
          <span className="text-blue-600 font-medium"> Professional training programs</span>.
        </p>
      
      </div>

      {/* Course header navigation */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-4">
        <div className="flex items-center border-b border-gray-200">
          <button 
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
            onClick={handlePrevClick} 
            aria-label="Previous"
            disabled={isHeaderLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="text-gray-700"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>

          <div 
            ref={headerContainerRef} 
            className="overflow-hidden flex-1"
          >
            {isHeaderLoading ? (
              <div className="flex font-medium h-14">
                {[...Array(visibleItemCount)].map((_, index) => (
                  <div 
                    key={`skeleton-${index}`}
                    className="flex-shrink-0 flex-grow flex items-center justify-center h-full px-4 py-3"
                    style={{ width: `${100 / visibleItemCount}%` }}
                  >
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex font-medium">
                {getVisibleHeaders().map((header) => (
                  <HeaderItem key={header.id} header={header} />
                ))}
              </div>
            )}
          </div>

          <button 
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none" 
            onClick={handleNextClick} 
            aria-label="Next"
            disabled={isHeaderLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="text-gray-700"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Course content */}
      <div className="w-full bg-gray-50 py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[50vh] md:min-h-[60vh]">
            {activeHeaderName && <CourseCards categoryName={activeHeaderName} categoryId={activeHeader} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;