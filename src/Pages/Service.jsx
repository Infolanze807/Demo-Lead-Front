import React from 'react'
import ServiceSection from '../Components/Service/ServiceSection'
import ServiceContent from '../Components/Service/ServiceContent'
import ServiceData from '../Components/Service/ServiceData'
import { Helmet } from 'react-helmet'

function Service() {
  return (
    <>
    <Helmet>
      <title>Services | Lead Hunter</title>
    </Helmet>
      <ServiceContent />
      <ServiceSection />
      <ServiceData />
    </>
  )
}

export default Service