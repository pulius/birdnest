import React, { useEffect, useState } from 'react';
import { parse } from 'fast-xml-parser';
import Violator from './components/Violator';

function App() {
  const [drones, setDrones] = useState([]);

  const droneHook = () => {
    fetch(`http://localhost:7777/drones`)
    .then(response => response.json())
    .then(data => {setDrones(data)
      console.log("fetch")
  })
  }

useEffect(() => {
  setInterval(function() {
  droneHook()}, 10000)
}, [])

  return (
    <div
    >
      {drones.map(drone => 
      <Violator
      key={drone.serialNumber}
      drone={drone}
      ></Violator>)}
    </div>
  );
}

export default App;
