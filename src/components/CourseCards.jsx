import React, { useState, useEffect } from 'react';

// CourseCard Component
const CourseCard = (props) => {
  const { 
    id,
    title, 
    level, 
    duration, 
    img, 
    category 
  } = props;

  const handleCardClick = (courseId) => {
    // Navigation logic would go here
    console.log('Navigate to course:', courseId);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Intermediate': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Advanced': return 'bg-rose-50 text-rose-700 border border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:translate-y-[-2px] cursor-pointer z-10"
      onClick={() => handleCardClick(id || '')}>
      
      {/* Course Header with Image */}
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
        {/* Category Tag */}
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
          {category || "Category"}
        </div>
        
        {/* Course Image */}
        <img 
          src={img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=320&fit=crop'} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>
      
      {/* Course Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Course Title */}
        <h3 className="mb-3 text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem] leading-snug">
          {title || "Course Title"}
        </h3>
        
        {/* Course Duration */}
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
            <span className="font-medium">{duration || "0 hours"}</span>
          </div>
        </div>
        
        {/* Spacer */}
        <div className="flex-grow"></div>
        
        {/* Level Badge */}
        <div className="flex justify-start">
          <span className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${getLevelColor(level)}`}>
            {level || "Beginner"}
          </span>
        </div>
      </div>
      
      {/* Hover effect accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

// Skeleton loader for courses
const CourseCardSkeleton = ({ index }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 z-10">
      {/* Image Skeleton */}
      <div className="h-44 sm:h-48 md:h-52 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%]"></div>
      
      {/* Content Skeleton */}
      <div className="flex flex-col p-5 flex-grow">
        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse bg-[length:200%_100%]"></div>
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse bg-[length:200%_100%] w-3/4"></div>
        </div>
        
        {/* Duration Skeleton */}
        <div className="mb-4">
          <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse bg-[length:200%_100%] w-24"></div>
        </div>
        
        <div className="flex-grow"></div>
        
        {/* Level Badge Skeleton */}
        <div className="flex justify-start">
          <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse bg-[length:200%_100%] w-20"></div>
        </div>
      </div>
    </div>
  );
};

// CourseCards Component with Background
const CourseCards = ({ categoryId, categoryName }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback course data
  const fallbackCourseData = [
    {
      id: 1,
      title: "Introduction to Web Development",
      level: "Beginner",
      duration: "8 hours",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=320&fit=crop",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Advanced React Concepts",
      level: "Advanced",
      duration: "12 hours",
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=320&fit=crop",
      category: "Frontend"
    }
  ];

  // Fetch courses when categoryName changes
  useEffect(() => {
    const fetchCourses = async () => {
      if (!categoryName) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Minimum loading time to show smooth transition
        const minLoadTime = 800;
        const startTime = Date.now();
        
        const response = await fetch(`https://wb132r23-8000.inc1.devtunnels.ms/get-courses-by-category/${categoryName}`);
        if (!response.ok) throw new Error("Failed to fetch courses");
        
        const data = await response.json();
        
        // Ensure minimum loading time for smooth UX
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
          if (data && Array.isArray(data)) {
            setCourses(data);
          } else {
            const filteredFallback = fallbackCourseData.filter(
              course => course.category === categoryName
            );
            setCourses(filteredFallback.length > 0 ? filteredFallback : fallbackCourseData);
          }
          setIsLoading(false);
        }, remainingTime);
        
        // Preload the next category data
        if (categoryId && typeof categoryId === 'number') {
          const nextCategoryId = categoryId + 1; 
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'fetch';
          preloadLink.href = `https://wb132r23-8000.inc1.devtunnels.ms/get-courses-by-category/${nextCategoryId}`;
          document.head.appendChild(preloadLink);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
        const filteredFallback = fallbackCourseData.filter(
          course => course.category === categoryName
        );
        setCourses(filteredFallback.length > 0 ? filteredFallback : fallbackCourseData);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [categoryName, categoryId]);

  return (
    <div className="relative w-screen bg-white overflow-hidden py-16 -mx-[50vw] left-1/2">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }

        @keyframes fade-in {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 2s; }
        .animate-float-delayed-2 { animation: float 8s ease-in-out infinite 4s; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Background Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue Geometric Shapes */}
        <div className="absolute top-20 right-10 w-16 h-16 border-2 border-blue-600/20 rounded-full animate-float"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 border-2 border-blue-600/15 rounded-full animate-float-delayed-2"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-20 bg-blue-600/5 rounded-lg animate-float-delayed transform -rotate-12"></div>
        
        {/* Yellow Accent Shapes */}
        <div className="absolute top-32 left-1/4 w-8 h-8 bg-yellow-400/25 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 right-1/4 w-14 h-14 bg-yellow-400/15 rounded-lg animate-float transform rotate-45"></div>
        <div className="absolute top-1/3 left-10 w-6 h-6 bg-yellow-400/30 rounded-full animate-float"></div>
        
        {/* Abstract Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-pulse"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-10 left-10 w-16 h-16 border-l-3 border-t-3 border-yellow-400/40"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-r-3 border-b-3 border-blue-600/40"></div>
        
        {/* Additional Floating Elements */}
        <div className="absolute top-40 right-20 w-10 h-2 bg-blue-600/20 rounded-full animate-float"></div>
        <div className="absolute bottom-40 left-1/3 w-18 h-12 bg-yellow-400/10 rounded-lg animate-float-delayed transform rotate-12"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/3 right-1/5 w-40 h-40 bg-blue-600/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/5 w-60 h-60 bg-yellow-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-2/3 w-32 h-32 bg-gray-600/2 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Course Cards Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {error ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {isLoading ? (
              // Show skeleton loaders while loading
              Array.from({ length: 8 }).map((_, index) => (
                <CourseCardSkeleton key={`skeleton-${categoryName}-${index}`} index={index} />
              ))
            ) : courses.length > 0 ? (
              // Show actual courses with staggered animation
              courses.map((course, index) => (
                <div 
                  key={`course-${course.id || course._id}`}
                  className="animate-fade-in opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CourseCard
                    id={course._id || course.id}
                    title={course.title}
                    level={course.level}
                    duration={course.duration}
                    img={course.imageUrl || course.img}
                    category={course.category || categoryName}   
                  />
                </div>
              ))
            ) : (
              // No courses found message
              <div className="col-span-full text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500">We couldn't find any courses for {categoryName}.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCards;