import React from 'react'
import UserLayout from '../../Components/UserLayout/UserLayout'
import Header from '../../Components/Header/Header'
import Services from '../../Components/Services/Services'
import Section from '../../Components/Section/Section'
import Footer from '../../Components/Footer/Footer'

const LandingPage = () => {
    return <UserLayout>
        <Header/>
        <Services/>
        <Section/>
        
    </UserLayout>
}

export default LandingPage