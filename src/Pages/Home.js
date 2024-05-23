import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../Components/Home/HeroSection";
import AboutSection from "../Components/Home/AboutSection";
import FAQ from "../Components/Home/FAQ";
import ServiceSection from "../Components/Home/ServiceSection";
import WorkSection from "../Components/Home/WorkSection";
import ContactSection from "../Components/Home/ContactSection";
import Whatsapp from "../Components/Home/Whatsapp"

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to dashboard if token exists
      navigate('/dashboard');
    }
  }, [navigate]);

   return (
    <>
      <HeroSection />
      <AboutSection />
      <FAQ />
      <ServiceSection />
      <ContactSection />
      <WorkSection />
      <Whatsapp />
    </>
   );
};

export default Home;