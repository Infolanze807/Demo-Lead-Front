import React from 'react'
import AboutUs from '../Components/About/AboutUs'
import AboutSection from '../Components/About/AboutSection'
import AboutInfo from '../Components/About/AboutInfoLanze'
import { Helmet } from 'react-helmet'

function About() {
  return (
    <div>
      <Helmet>
      <title>About | Lead Hunter</title>
    </Helmet>
      <AboutUs />
      <AboutSection />
      <AboutInfo />
    </div>
  )
}

export default About