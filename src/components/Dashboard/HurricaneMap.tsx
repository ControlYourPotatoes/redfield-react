import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button } from '@mui/material';

const HurricaneMap: React.FC = () => {
  const [hurricanePosition, setHurricanePosition] = useState<[number, number]>([15.3, -61.3]);
  const [hurricanePath, setHurricanePath] = useState<[number, number][]>([]);

  const hurricaneIcon = new L.Icon({
    iconUrl: '/assets/gifs/hurricaneicon.gif',
    iconSize: [150, 150],
    iconAnchor: [75, 75],
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/hurricane')
      .then(response => response.json())
      .then(data => {
        const transformedPath = data.path.map((point: { lat: number; lon: number }) => [point.lat, point.lon] as [number, number]);
        setHurricanePath(transformedPath);
      })
      .catch(error => console.error("Failed to load hurricane path data:", error));
  }, []);

  const sendEmail = (message: string) => {
    fetch('http://localhost:8080/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  const startAnimation = () => {
    let pathIndex = 0;

    const interval = setInterval(() => {
      if (pathIndex < hurricanePath.length) {
        const currentPosition = hurricanePath[pathIndex];
        setHurricanePosition(currentPosition);

        if (currentPosition[0] === hurricanePath[1][0] && currentPosition[1] === hurricanePath[1][1]) {
          const emailMessageFirstMark = `Dear insured,      
    We hope this message finds you well amidst these challenging times. As a committed partner in your safety and well-being, Redfield Insurance is closely monitoring the progression of the hurricane, which has now reached a significant milestone in its approach towards our area.
Hurricane Update:
    The hurricane has reached the first critical point, signaling that it is advancing as anticipated and now presents a tangible risk to our community. This development necessitates our collective immediate action to prepare and mitigate its potential impacts.
Your Insurance Coverage:
    As the hurricane approaches, we at Redfield Insurance want to remind you of the special provisions in your policy designed for swift and uncomplicated support during natural disasters:
Action & Preparedness Tips:
    - Secure any outdoor items that could become hazards in strong winds.
    - Document your valuables and property with photos or videos for any future claims.
    - Keep abreast of local advisories and make necessary preparations for your safety.
We're Here to Support You:
    Redfield's team is on standby, ready to assist you through this period. Our emergency support line is available 24/7.`;
          sendEmail(emailMessageFirstMark);
        } else if (currentPosition[0] === hurricanePath[2][0] && currentPosition[1] === hurricanePath[2][1]) {
          const emailMessageSecondMark = `Dear insured,
    As the hurricane continues its trajectory, we want to inform you that it has now reached the second critical milestone on its path. This update is a significant indicator of the storm's strength and potential impact on our area.
Current Situation:
    The hurricane has intensified, matching predictions and signaling an escalated risk level. Authorities may have updated advisories, including possible evacuation orders and safety precautions.
What This Means for You:
    It is crucial to remain vigilant and adhere to all recommended safety measures and instructions from local officials. Ensure that your emergency kit is fully stocked and that you have a safe, predetermined location to stay during the storm.
Redfield Insurance Support:
    We are actively monitoring the situation and are ready to provide assistance as needed. Remember, your policy includes enhanced protections for situations like these, ensuring you have the support for immediate needs without the necessity for claim submissions.
Stay Safe and Informed:
    Continue monitoring local news and official announcements for the latest updates and instructions. Review and follow our preparedness tips to minimize risk to you and your property.
We're Here for You:
    Please remember that Redfield Insurance is with you every step of the way. Should you need any support or have questions, contact us. Our priority is your safety and peace of mind during these challenging times.
    Let's stay safe and support each other as we navigate through this. Further updates will follow as the situation develops.
Warm regards,
Redfield Smart Contract Insurance`;
          sendEmail(emailMessageSecondMark);
        } else if (currentPosition[0] === hurricanePath[3][0] && currentPosition[1] === hurricanePath[3][1]) {
          const emailMessageThirdMark = `Dear Sofia Smith,
    We hope this email finds you safe and well. We have important news regarding your insurance policy with Redfield Insurance, particularly concerning the imminent impact of the hurricane.
Update on Hurricane Progress:
    We regret to inform you that the hurricane has now reached the third significant milestone in its path, bringing it within 50 kilometers of your property at 123 Main St. This development indicates that the storm's effects may soon be felt in your area.
Instant Insurance Payment Confirmation:
    As outlined in your Standard Policy, we are pleased to confirm that your property coverage entitles you to an instant payment of $350 in the event of a hurricane reaching within 50 kilometers of your insured property. This payment will be deposited into your designated account immediately to assist with any necessary preparations or mitigations.
Next Steps:
    Please ensure your safety remains your top priority. Follow all local advisories and take necessary precautions to protect yourself and your property.
    If you have any questions or require further assistance, do not hesitate to reach out to us. Our team is here to support you through this challenging time.
Stay Informed:
    Continue to monitor local weather updates and follow official instructions from emergency authorities. Preparation and vigilance are crucial in navigating through this situation safely.
    Sofia, please know that your well-being is our primary concern. We are committed to providing you with the support and assistance you need during this time of uncertainty. Stay safe, and please do not hesitate to reach out if you require any additional assistance.
Warm regards,
Redfield Smart Contract Insurance`;
          sendEmail(emailMessageThirdMark);
        }
        pathIndex += 1;
      } else {
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <Box sx={{ borderColor: 'primary.main', width: '100%' }}>
      <MapContainer center={hurricanePosition} zoom={6} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={hurricanePosition} icon={hurricaneIcon} />
        <Polyline positions={hurricanePath} color="red" />
      </MapContainer>
      <Button onClick={startAnimation} variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Start Animation
      </Button>
    </Box>
  );
};

export default HurricaneMap;
