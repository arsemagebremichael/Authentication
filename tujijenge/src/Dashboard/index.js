import React, { useState } from 'react';
import ImpactChart from './components/ImpactChart';
import TrainingTable from './components/TrainingTable';
import './styles.css'



export default function AppLayout() {
  const [isCollapsed] = useState(false);


  return (
    <div style={{ display: 'flex' }}>
      <div>

        <div className={`main ${isCollapsed ? 'main-collapsed' : 'main-expanded'}`}>
          <div className="chart-and-calendar-container">
            <ImpactChart />
            
          </div>
          <TrainingTable/>
        </div>
        
      </div>
    </div>
  );
}