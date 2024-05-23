import React from 'react'
import ContactHero from '../Components/Contact/ContactHero'
import { Helmet } from 'react-helmet'

function Contact() {
  return (
    <div>
      <Helmet>
        <title>Contact | Lead Hunter</title>
      </Helmet>
      <ContactHero />
    </div>
  )
}

export default Contact