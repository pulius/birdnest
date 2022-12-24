import React, { useEffect, useState } from 'react';

function Violator({drone}) {

  const [violator, setViolator] = useState({});

  const violatorHook = () => {
    try {
    fetch(`http://localhost:7777/violators/${drone.serialnumber}`, {
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
    <div
    style={{margin: '10px', padding: '10px', fontWeight: 'bold', backgroundColor: '#7ad158', borderRadius: '20px', display: 'flex', flexDirection: 'row'}}>
      <div style ={{ width: '50%', display: 'flex', alignItems: 'center'}}>
      <p style={{color: '#363636'}}>
      Name: {violator.firstName} {violator.lastName}
      <br></br>
      Email: {violator.email}
      <br></br>
      Phone number: {violator.phoneNumber}
      <br></br>
      </p>
      </div>
      <div style={{width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
      <div style={{width: '100px', height:'100px', borderRadius:'50px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36}}>
      <p style={{color: 'red'}}>
      {drone.distance} m
      </p>
      </div>
      <br></br>
      </div>
    </div>
  );
}

export default Violator;
