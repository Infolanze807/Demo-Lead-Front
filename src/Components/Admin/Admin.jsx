import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import DashNav from '../Dashboard/DashNav'
import AdminPenal from './AdminPenal'
import Free from '../Free'

function Admin() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      navigate('/register');
    } else if (role === 'Basic') {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  return (
    <div>
        <DashNav role="Admin" />
        <Free />
        <AdminPenal />
    </div>
  )
}

export default Admin