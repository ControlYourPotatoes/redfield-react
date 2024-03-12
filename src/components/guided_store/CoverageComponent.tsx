import { useState } from 'react';
import styled from 'styled-components';

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

// Styling for the switch
const Switch = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SwitchLabel = styled.label`
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
`;

// Adjust Slider to use isActive prop for styling
const Slider = styled.span<SliderProps>`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  background-color: #ccc;
  border-radius: 34px;
  margin: 0 10px;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
    transition: 0.4s;
    transform: ${({ isActive }) => isActive ? 'translateX(26px)' : 'none'};
  }
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
  margin-left: -9999px; // Visually hide the input
`;

// Styling for the tables
const Table = styled.table`
  border-collapse: collapse;
  width: 150%;
  margin: 0 -20px;
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  th {
    background-color:lightgray;
  }
`;

// Styling for the policy selection 
const PolicySelector = styled.label`
  margin-top: 20px;
  display: block;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

// Styling for the message displaying the selected policy
const SelectedPolicyMessage = styled.div`
 width: 450px; // Reserve space for the message
 margin-top: 20px;
 text-align: center;
 transition: opacity 0.3s ease;
 opacity: 0; // Invisible by default
`;


// Types definitions
type PolicyType = 'Basic' | 'Premium';

// Define an interface for SliderProps to accept the activePolicy prop
interface SliderProps {
    isActive: boolean;
  }
  
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
    <Switch>
        <SwitchLabel>Basic</SwitchLabel>
        <SwitchInput
          type="checkbox"
          id="policyToggle"
          checked={activePolicy === 'Premium'}
          onChange={togglePolicy}
        />
        <Slider isActive={activePolicy === 'Premium'} onClick={togglePolicy}></Slider>
        <SwitchLabel>Premium</SwitchLabel>
      </Switch>
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
        {selectedPolicyName ? `"Selected Policy: ${selectedPolicyName}" has been sent to the server.` : ''}
      </SelectedPolicyMessage>
  </Container>
);
};

export default CoverageComponent;
