import React, { useEffect, useState } from 'react';
import violatorStyles from '../styles/violatorStyles';

const Violator = ({drone}) => {

  const [violator, setViolator] = useState({});

  const onFetchFailed = () => {
    setViolator({
      "pilotId": "unavailable",
      "firstName": "unavailable",
      "lastName": "unavailable",
      "phoneNumber": "unavailable",
      "createdDt": "unavailable",
      "email": "unavailable"
    });
  }

  const violatorHook = () => {
    try {
      fetch(`https://birdnest-api.fly.dev/violators/${drone.serialnumber}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setViolator(JSON.parse(data.violator).violator)
        } else {
          onFetchFailed();
          console.log(`Unable to fetch ${drone.serialnumber}`)
        }
      });
    } catch (err) {
      onFetchFailed();
      console.log('Error from backend: ' + err);
    }
  }

  useEffect(() => {
    violatorHook();
  }, []); 

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
