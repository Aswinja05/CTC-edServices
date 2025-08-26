import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MultipleCard from '../components/MultipleCard'
import CourseDisplay from '../components/CourseHeader'
import PlacementGuidance from '../components/PlacementGuidance'
import Footer from '../components/Footer'
import WhatWeDo from '../components/WhatWeDo'
import ClientsSec from '../components/ClientsSec'

const HomPage = () => {
    return (
        <div>
            {/* <div className="relative flex flex-col items-center justify-center px-4 md:px-8">
            <div className="absolute inset-0 bg-[url('../src/assets/img/hero-bg-1.jpg')] bg-cover bg-repeat opacity-85 z-[-1] brightness-[.2] animate-marquee"
                style={{
                animation: "marquee 30s linear infinite",
            }}></div> */}
            {/* </div> */}
            <Navbar />
            <Hero />
            <WhatWeDo />
            {/* <Navbar />
            <Hero /> */}
            {/* <MultipleCard /> */}
            <CourseDisplay />
            <ClientsSec />
            <PlacementGuidance />
            <Footer />
        </div>
    )
}

export default HomPage
