import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Failed() {
  const navigate = useNavigate();

  useEffect(() => {
    alert("Payment failed. Please try again.");
    navigate("/");
  }, [navigate]);

  return (
    <div></div>
  );
}

export default Failed;
