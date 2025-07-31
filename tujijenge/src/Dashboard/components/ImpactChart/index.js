


import React from 'react';
import './styles.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import CalendarView from '../EventCalendar';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
ChartJS.register(ArcElement, Tooltip, Legend);



const data = {
    labels: ["Trained Mama Mboga", "Untrained Mama Mboga"],
    datasets: [{
      data: [60, 40],
      backgroundColor: [
        '#999F6C',
        '#084236',
      ],
      borderColor: [
        'white'
      ],
      borderWidth:0.1
  
  
    },],
  };
  
  
  const options = {
    cutout: '80%',
      plugins:{
        legend: {
          display: false
        }
      }
   }
  
  
  


export default function ImpactChart() {

  const navigate = useNavigate();
  const handleClick = 
  () => {
    navigate('/calendar')
  }
  
  const trainedPercentage = data.datasets[0].data[0];
  return (
    <div className="dashboard">
      <div className="cards-and-chart">
      <div className="cards">
        <div className="card">
          <FontAwesomeIcon className='group' icon={faUserGroup}/>
          <p style={{fontSize:14, fontWeight:600}}>Communities:<span style={{fontWeight:400}}> 15</span> <br/><br/>
          Number of communities trained: <span style={{fontWeight:400}}> 10</span></p>

        </div>
        <div className="card">
        <FontAwesomeIcon className='group' icon={faUserGroup}/>
         <p style={{fontSize:15, fontWeight:600}}>Mama Mboga:<span style={{fontWeight:400}}> 300</span><br/><br/>
          Number of mama mboga trained:<span style={{fontWeight:400}}> 200</span></p> 
          </div>
      </div>
      <div className="impact-chart">
        {/* [Impact Donut Chart Placeholder] */}
      <div className="chart-title">
     <h1>Impact</h1>

    </div>
      <div className="legend">
       {data.labels.map((label, index) => (
          <div key={index} className="legend-item">
            <span
            className="legend-color"
            style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            ></span>
            <span className="legend-label">{label}</span>
          </div>
        ))}
      </div>
        <div className="doughnut">
    <Doughnut data={data} options={options}/>
    <div className="doughnut-inner">
          <span>{trainedPercentage}%</span>
          <span>Trained</span>
        </div>
    </div>
    </div>
    <CalendarView onclick= {handleClick} style ={{cursor: 'pointer'}}/>

      </div>
      </div>
      
   
  );
}