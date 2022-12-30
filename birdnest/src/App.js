import React, { useEffect, useState } from 'react';
import Violator from './components/Violator.jsx';

function App() {
  const [drones, setDrones] = useState([]);

  const droneHook = () => {
    fetch(`https://birdnest-api.fly.dev/drones`)
    .then(response => response.json())
    .then(data => {setDrones(data)
      console.log("fetch")
  })
  }

useEffect(() => {
  setInterval( () => {
  droneHook()}, 10000)
}, [])

  return (
    <div
    >
      {drones.map(drone => 
        <Violator
          key={drone.serialnumber + '@' + drone.timestamp}
          drone={drone}>
        </Violator>
      )}
    </div>
  );
}

export default App;
