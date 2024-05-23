import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import DashNav from './DashNav';
import Leads from './Leads/Leads';
import Free from '../Free';

function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      navigate('/register');
    } else if (role === 'Admin') {
      navigate('/admin');
    }
  }, [navigate]);
  return (
    <div>
        <DashNav />
        <Free />
        <Leads />
    </div>
  )
}

export default Dashboard