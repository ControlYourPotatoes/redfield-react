import { useState } from 'react';
import styled from 'styled-components';
import { Typography, Switch, FormControlLabel, Button, Alert } from '@mui/material';

// Styling for the overall layout, adjusted for wider tables
const Container = styled.div`
max-width: 195%; // Adjusted to ensure it fits within most screens
margin: auto; 
padding: 120px; // Added padding to make space for the message
background: #fff; // Assuming you want a white background container
box-shadow: 0 0 100px rgba(0, 0, 0, 0.1); // Optional: adds a subtle shadow for depth
display: flex;
flex-direction: column;
align-items: center; // Center children (including the toggle button)

`;

// Styling for the tables
const Table = styled.table`
  border-collapse: collapse;
  width: 130%;
  margin: 20px 0;
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color:#f2f2f2;
  }
`;

// Styling for the policy selection 
const PolicySelector = styled.label`
  display: block;
  margin: 20px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

// Styling for the message displaying the selected policy
const SelectedPolicyMessage = styled.div`
 height: 20px;
 margin-top: 20px;
 text-align: center;
 transition: opacity 0.3s ease;
 opacity: 0; // Invisible by default
`;


// Types definitions
type PolicyType = 'Basic' | 'Premium';

// Define an interface for SliderProps to accept the activePolicy prop
  
interface Category {
  windSpeed: string;
  payment: string;
}

interface Policy {
  categories: Category[];
  price: number;
}

interface Policies {
  Basic: Policy;
  Premium: Policy;
}

// React component
const CoverageComponent = () => {
  const [activePolicy, setActivePolicy] = useState<PolicyType>('Basic'); // To track which policy is active
  const [selectedPolicyName, setSelectedPolicyName] = useState<string>('');// To track the selected policy name
  const [isPolicySelected, setIsPolicySelected] = useState<boolean>(false);// To track checkbox state

  // Data for policies
  const policies: Policies = {
    Basic: {
      categories: [
        { windSpeed: '≥ 157 mph', payment: '1000' },
        { windSpeed: '130 - 156 mph', payment: '450 - $800' },
        { windSpeed: '111 - 129 mph', payment: '150 - $350' },
        { windSpeed: '76 - 110 mph', payment: '50 - $100' },
        { windSpeed: '74 - 95 mph', payment: '25' },
      ],
      price: 100,
    },
    Premium: {
      categories: [
        { windSpeed: '≥ 157 mph', payment: '2000' },
        { windSpeed: '130 - 156 mph', payment: '900 - $1,600' },
        { windSpeed: '111 - 129 mph', payment: '300 - $700' },
        { windSpeed: '76 - 110 mph', payment: '100 - $200' },
        { windSpeed: '74 - 95 mph', payment: '50' },
      ],
      price: 200,
    },
  };

  // Clone the categories array and reverse it to display from 5 to 1
const reversedCategories = [...policies[activePolicy].categories].reverse();

  // Function to toggle between Basic and Premium policies
  const togglePolicy = () => {
    setActivePolicy(activePolicy === 'Basic' ? 'Premium' : 'Basic');
    setIsPolicySelected(false); // Reset selection on toggle
  };

   // Function to handle policy selection via checkbox
   const handlePolicySelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPolicySelected(event.target.checked);
    setSelectedPolicyName(event.target.checked ? activePolicy : '');
  };

  return (
    <Container>
    <FormControlLabel
        control={
          <Switch
            checked={activePolicy === 'Premium'}
            onChange={togglePolicy}
            name="policySwitch"
            color="primary"
          />
        }
        label={activePolicy === 'Premium' ? 'Premium' : 'Basic'}
      />
    <Table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Wind Speed</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
        {policies[activePolicy].categories.map((category, index) => (
          <tr key={index}>
            <td>{reversedCategories.length - index}</td> 
            <td>{category.windSpeed}</td>
            <td>{category.payment}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={2}>Policy Price</td>
          <td>${policies[activePolicy].price}</td>
        </tr>
      </tbody>
    </Table>
    <PolicySelector>
      <Checkbox
        type="checkbox"
        checked={isPolicySelected}
        onChange={handlePolicySelection}
      />
      Select {activePolicy} Policy
    </PolicySelector>
    <SelectedPolicyMessage style={{ opacity: selectedPolicyName ? 1 : 0 }}>
        {selectedPolicyName ? `${selectedPolicyName} Policy has been selected` : ''}
      </SelectedPolicyMessage>

            <Typography variant="body2" sx={{ marginTop: '14px', padding: '0 2px' }}>
                Please note: The insurance policy comes into effect 15 days after being paid. 
                The payment amounts listed are illustrative examples only and may not reflect 
                actual prices applicable to your region. Actual payments are subject to variation 
                based on geographical location and other factors. We recommend consulting with our 
                customer service team for detailed pricing information specific to your area.
            </Typography>
  </Container>
);
};

export default CoverageComponent;
