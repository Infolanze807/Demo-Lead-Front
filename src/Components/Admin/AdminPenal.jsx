import React, { useState } from 'react';
import AddLeads from './AddLeads/AddLeads';
import ShowLeads from './AddLeads/ShowLeads';

function AdminPanel() {
  const [activeComponent, setActiveComponent] = useState('addLeads');

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="font-family bg-[--main-color]">
      <div className='py-10'>
        <div className="flex gap-5 justify-center">
          <button className={`border bg-slate-300 p-2 rounded-md ${activeComponent === 'addLeads' ? ' bg-slate-600 text-white' : ''}`} onClick={() => handleButtonClick('addLeads')}>
            Add Leads
          </button>
          <button className={`border bg-slate-300 p-2 rounded-md ${activeComponent === 'showLeads' ? 'bg-slate-600 text-white' : ''}`} onClick={() => handleButtonClick('showLeads')}>
            Show Leads
          </button>
        </div>
        <div>
          {activeComponent === 'addLeads' && <AddLeads />}
          {activeComponent === 'showLeads' && <ShowLeads />}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
