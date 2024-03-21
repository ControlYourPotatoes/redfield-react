import React, { useContext, useEffect } from 'react';
import { useAuth } from '../pages/AuthContext';
import PolicyContext from './PolicyContext';
const baseUrl = import.meta.env.VITE_API_BASE_URL || ''; // Fallback to empty string if not defined

// Function to send email (mock implementation)
const sendEmail = (message: string, subject: string, recipient: string) => {
    fetch(`${baseUrl}/api/send-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, subject, recipient }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

const Emails = () => {
    const { currentUser } = useAuth();
    const policyContext = useContext(PolicyContext);
    
    useEffect(() => {
        if (!policyContext || !currentUser || !policyContext.status) {
            return; // Do nothing if context or user is not available or if status is not set
        }

        const { status } = policyContext;
        const firstName = currentUser.firstName;
        const recipient = currentUser.email;

        console.log("Current Index value:", status);

        let subject;
        let message;

        // Assuming email sending logic is encapsulated in sendEmail function
        if (status === 2) {
            subject =`Urgent Update & Insurance Redfield Information: Hurricane `;
            message = 
            `<p>Dear ${firstName}</p>
            <p>We hope this message finds you well amidst these challenging times. As a committed partner in your safety and well-being, Redfield Insurance is closely monitoring the progression of the hurricane, which has now reached a significant milestone in its approach towards our area.</p>
            <h2>Hurricane Update:</h2>
            <p>The hurricane has reached the first critical point, signaling that it is advancing as anticipated and now presents a tangible risk to our community. This development necessitates our collective immediate action to prepare and mitigate its potential impacts.</p>
            <h2>Your Insurance Coverage:</h2>
            <p>As the hurricane approaches, we at Redfield Insurance want to remind you of the special provisions in your policy designed for swift and uncomplicated support during natural disasters:</p>
            <h2>Action & Preparedness Tips:</h2>
            <ul>
              <li>Secure any outdoor items that could become hazards in strong winds.</li>
              <li>Document your valuables and property with photos or videos for any future claims.</li>
              <li>Keep abreast of local advisories and make necessary preparations for your safety.</li>
            </ul>
            <p>We're Here to Support You:</p>
            <p>Redfield's team is on standby, ready to assist you through this period. Our emergency support line is available 24/7.</p>
            `;
            sendEmail(message, subject, recipient);
        } else if (status === 3) {
            subject = `Urgent Update: The hurricane Hits Second Milestone -- Stay Prepared`;
            message = 
            `<p>Dear ${firstName}</p>
          <p>As the hurricane continues its trajectory, we want to inform you that it has now reached the second critical milestone on its path. This update is a significant indicator of the storm's strength and potential impact on our area.</p>
          
          <h2>Current Situation:</h2>
          <p>The hurricane has intensified, matching predictions and signaling an escalated risk level. Authorities may have updated advisories, including possible evacuation orders and safety precautions.</p>
          
          <h2>What This Means for You:</h2>
          <p>It is crucial to remain vigilant and adhere to all recommended safety measures and instructions from local officials. Ensure that your emergency kit is fully stocked and that you have a safe, predetermined location to stay during the storm.</p>
          email
          <h2>Redfield Insurance Support:</h2>
          <p>We are actively monitoring the situation and are ready to provide assistance as needed. Remember, your policy includes enhanced protections for situations like these, ensuring you have the support for immediate needs without the necessity for claim submissions.</p>
          
          <h2>Stay Safe and Informed:</h2>
          <p>Continue monitoring local news and official announcements for the latest updates and instructions. Review and follow our preparedness tips to minimize risk to you and your property.</p>
          
          <h2>We're Here for You:</h2>
          <p>Please remember that Redfield Insurance is with you every step of the way. Should you need any support or have questions, contact us. Our priority is your safety and peace of mind during these challenging times.</p>
          
          <p>Let's stay safe and support each other as we navigate through this. Further updates will follow as the situation develops.</p>
          
          <p>Warm regards,<br>
          Redfield Smart Contract Insurance</p>`;
            sendEmail(message, subject, recipient);
        } else if (status === 4) {
            subject = ` Important Update: Hurricane Approaching -- Instant Insurance Payment Confirmation`;;
            message = 
            `<p>Dear ${firstName}</p>
          <p>We hope this email finds you safe and well. We have important news regarding your insurance policy with Redfield Insurance, particularly concerning the imminent impact of the hurricane.</p>
          
          <h2>Update on Hurricane Progress:</h2>
          <p>We regret to inform you that the hurricane has now reached the third significant milestone in its path, bringing it within 50 kilometers of your property. This development indicates that the storm's effects may soon be felt in your area.</p>
          
          <h2>Instant Insurance Payment Confirmation:</h2>
          <p>As outlined in your Standard Policy, we are pleased to confirm that your property coverage entitles you to an instant payment of $350 in the event of a hurricane reaching within 50 kilometers of your insured property. This payment will be deposited into your designated account immediately to assist with any necessary preparations or mitigations.</p>
          
          <h2>Next Steps:</h2>
          <p>Please ensure your safety remains your top priority. Follow all local advisories and take necessary precautions to protect yourself and your property.</p>
          <p>If you have any questions or require further assistance, do not hesitate to reach out to us. Our team is here to support you through this challenging time.</p>
          
          <h2>Stay Informed:</h2>
          <p>Continue to monitor local weather updates and follow official instructions from emergency authorities. Preparation and vigilance are crucial in navigating through this situation safely.</p>
          <p>Sofia, please know that your well-being is our primary concern. We are committed to providing you with the support and assistance you need during this time of uncertainty. Stay safe, and please do not hesitate to reach out if you require any additional assistance.</p>
          
          <p>Warm regards,<br>
          Redfield Smart Contract Insurance</p>`;
            sendEmail(message, subject, recipient);
        }

        // Add your conditions for status 2, 3, 4 and send emails accordingly
    }, [policyContext?.status, currentUser]); // Re-run when status changes

    return (
        <div>
            {/* Component to potentially display some info or leave empty */}
        </div>
    );
};

export default Emails;
