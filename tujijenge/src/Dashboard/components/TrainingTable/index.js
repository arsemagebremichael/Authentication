import React, { useState } from 'react';
import './styles.css'; 


const sessionsData = [
  {
    id: 1, 
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  },
  {
    id: 2,
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  },
  {
    id: 3,
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  },
  {
    id: 4,
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  },
  {
    id: 5,
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  },
  {
    id: 6,
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  },
  {
    id: 7,
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  }
];

export default function TrainingTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sessionsData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sessionsData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>


      <table className="training-table">
    
        <thead>
          <tr>
            <th>Training Sessions</th>
            <th>Location</th>
            <th>Communities</th>
            <th>Registered</th>
            <th>Starting-date</th>
            <th>Ending-date</th>
          </tr>
        </thead>
        <tbody>
         
          {currentItems.map((item, index) => (
            <tr key={item.id || index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>{item.session}</td>
              <td>{item.location}</td>
              <td>{item.community}</td>
              <td>{item.registered}</td>
              <td>{item.start}</td>
              <td>{item.end}</td>
            </tr>
          ))}
        </tbody>
   
      </table>

      {totalPages > 1 && ( 
        <nav>
          <ul className="pagination-list"> 
            {currentPage > 1 && (
              <li>
                <button className="pagination-button" onClick={() => paginate(currentPage - 1)}>
                  &lt; Prev
                </button>
              </li>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1}>
                <button
                  className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            {currentPage < totalPages && (
              <li>
                <button className="pagination-button" onClick={() => paginate(currentPage + 1)}>
                  Next &gt;
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
