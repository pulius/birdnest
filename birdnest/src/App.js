import React, { useEffect, useState } from 'react';
import Violator from './components/Violator.jsx';

const App = () => {
  const [drones, setDrones] = useState([]);

  const droneHook = () => {
    fetch(`https://birdnest-api.fly.dev/drones`)
    .then(response => response.json())
    .then(data => { 
      setDrones(data);
    });
  }

  useEffect(() => { // Initial fetch
    droneHook();
  }, []);

  useEffect(() => { // Periodic fetch every 10 seconds
    setInterval(() => {
      droneHook();
    }, 10000);
  }, []);

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
