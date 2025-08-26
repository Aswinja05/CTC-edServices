import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CourseDisplay from '../components/CourseHeader'
import PlacementGuidance from '../components/PlacementGuidance'
import Footer from '../components/Footer'
import WhatWeDo from '../components/WhatWeDo'
import ClientsSec from '../components/ClientsSec'

const HomPage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <WhatWeDo />
            <CourseDisplay />
            <ClientsSec />
            <PlacementGuidance />
            <Footer />
        </div>
    )
}

export default HomPage
