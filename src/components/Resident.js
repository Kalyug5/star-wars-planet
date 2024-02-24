import React, { useEffect, useState } from 'react'
import './../App.css'

const Resident = ({ resident }) => {

    const [residents, setResidents] = useState([]);
    const [loading,setLoading]=useState(false)

    const fetchResidents = async (residentUrls) => {
        try {
          const residentsPromises = residentUrls.map(async (url,index) => {
            const response = await fetch(url);
            const residentData = await response.json();
            return residentData;
          });
    
          const residents = await Promise.all(residentsPromises);
          return residents;
        } catch (error) {
          console.error('Error fetching residents:', error);
          return [];
        }
      };

      

      useEffect(() => {
        setLoading(true)
        fetchResidents(resident)
          .then((residents) => {
            setResidents(residents)
            setLoading(false)
          })
          .catch((error) => {
            console.error('Error fetching residents:', error)
            setLoading(false)
        })
        }
      , [resident]);
  return (
    <>
    {loading && <p>Loading...</p>}
    <ul className='resident-list'>{
      residents.map((resident,index) => (
      
      <li className="resident-list-item" key={index}>
      <h3>{resident.name}</h3>
      <p>Height: {resident.height}</p>
      <p>Mass: {resident.mass}</p>
      <p>Gender: {resident.gender}</p>
      </li>
    ))}
    </ul>
  </>
  )
}

export default Resident