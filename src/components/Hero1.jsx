import React from 'react'

const Hero1 = () => {
  return (
    <div className="flex flex-col h-[55vh] w-full items-center justify-items-start mt-[5%]">
      <h1 className="text-white text-5xl font-[1000] mb-4 bg-center">Transforming Learning, Building Careers</h1>
      <p className="text-white text-lg font-thin mb-8 text-center max-w-lg">
        From classroom to career, equipping tomorrow's leaders with essential industry skills.
      </p>
      {/* <div className="relative w-[80%] md:w-[60%] lg:w-[45%] z-30 cursor-pointer">
        <Searchbar />
      </div> */}
    </div>
  )
}

export default Hero1
