import React, { useEffect, useState } from 'react';
import violatorStyles from '../styles/violatorStyles';

function Violator({drone}) {

  const [violator, setViolator] = useState({});

  const violatorHook = () => {
    try {
    fetch(`https://birdnest-api.fly.dev/violators/${drone.serialnumber}`, {
       // mode: 'no-cors'
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        // console.log(JSON.parse(data.violator).violator)
        setViolator(JSON.parse(data.violator).violator)
      } else {
        setViolator({
          "pilotId": "unavailable",
          "firstName": "unavailable",
          "lastName": "unavailable",
          "phoneNumber": "unavailable",
          "createdDt": "unavailable",
          "email": "unavailable"
        })
      }
  })
  } catch {
    setViolator({
      "pilotId": "unavailable",
      "firstName": "unavailable",
      "lastName": "unavailable",
      "phoneNumber": "unavailable",
      "createdDt": "unavailable",
      "email": "unavailable"
    })
    console.log(`Unable to fetch ${drone.serialnumber}`)
  }
  }

useEffect(() => {
  violatorHook();
}, []) 

  return (
    <div key={violator.pilotId} style={violatorStyles.violatorBackground}>
      <div style={violatorStyles.contactInfoBox}>
        <p style={violatorStyles.contactInfoColoring}>
          Name: {violator.firstName} {violator.lastName}
          <br></br>
          Email: {violator.email}
          <br></br>
          Phone number: {violator.phoneNumber}
          <br></br>
        </p>
      </div>
      <div style={violatorStyles.distanceBox}>
        <div style={violatorStyles.distanceCircle}>
          <p style={violatorStyles.distanceColoring}>
            {drone.distance} m
          </p>
        </div>
        <br></br>
      </div>
    </div>
  );
}

export default Violator;
