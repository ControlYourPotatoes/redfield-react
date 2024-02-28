import { useState } from 'react';
import styled from 'styled-components';

const TablesContainer = styled.div`
display: flex;
justify-content: space-between; // Ensures tables start more apart
margin: 0 20px; // Adds some margin to the container edges
`;

const TableWrapper = styled.div`
  flex: 0.5; // Start with the tables in a minimized state
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center; // Centers the table content
  max-width: 20%; // Start with a max-width to keep tables small
  &:hover {
    flex: 2; // Expand the hovered table
    max-width: 80%; // Allow it to take majority of the space
  }
  &:not(:hover) {
    justify-content: flex-start; // Align non-hovered tables to the start
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
  display: none; // Initially hide the table details

  th, td {
    text-align: left;
    padding: 8px;
    border: 1px solid #ddd;
  }

  ${TableWrapper}:hover & {
    display: table; // Show the table on hover
  }
`;


const PolicyName = styled.div`
  font-weight: bold;
  text-align: center;
`;

const SelectedPolicyMessage = styled.div`
  margin-top: 20px;
  text-align: center;
`;

// Policy Category data type
type PolicyCategory = {
    windSpeed: string;
    payment: string;
  };
  
  // Policy data type including categories
  type Policy = {
    name: string;
    description: string;
    categories: PolicyCategory[];
    price: number;
  };

// Define your React component.
const CoverageComponent = () => {
    // State to keep track of the selected image.
    const [selectedPolicyName, setSelectedPolicyName] = useState('');
  
   // Simulated policy data including categories
  const policies: Policy[] = [
    {
      name: 'Basic',
      description: 'Basic coverage policy',
      categories: [
        { windSpeed: '≥ 157 mph', payment: '1000' },
        { windSpeed: '130 - 156 mph', payment: '450 - $800' },
        { windSpeed: '111 - 129 mph', payment: '150 - $350' },
        { windSpeed: '76 - 110 mph', payment: '50 - $100' },
        { windSpeed: '74 - 95 mph', payment: '25' },
      ],
      price: 100,
    },
    {
      name: 'Premium',
      description: 'Premium coverage policy',
      categories: [
        { windSpeed: '≥ 157 mph', payment: '2,000' },
        { windSpeed: '130 - 156 mph', payment: '900 - $1,600' },
        { windSpeed: '111 - 129 mph', payment: '300 - $700' },
        { windSpeed: '76 - 110 mph', payment: '100 - $200' },
        { windSpeed: '74 - 95 mph', payment: '50' },
      ],
      price: 200,
    },
  ];

    // Function to handle row click and send selected policy to server
  const handlePolicyClick  = async (policyName: string) => {
    setSelectedPolicyName(policyName);
    // Simulate sending the selected policy name to the server
    console.log('Selected policy name:', policyName);
  };
    
    return (
    <>
    <TablesContainer>
      {policies.map((policy, index) => (
        <TableWrapper key={index} onClick={() => handlePolicyClick(policy.name)}>
          <PolicyName>{policy.name}</PolicyName>
          <Table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Wind Speed</th>
                <th>Payment</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {policy.categories.map((category, categoryIndex) => (
                <tr key={categoryIndex}>
                  <td>{categoryIndex + 1}</td>
                  <td>{category.windSpeed}</td>
                  <td>${category.payment}</td>
                  <td>${policy.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      ))}
    </TablesContainer>
    {selectedPolicyName && (
      <SelectedPolicyMessage>
        "Selected Policy: {selectedPolicyName}" has been sent to the server.
      </SelectedPolicyMessage>
    )}
  </>
);
};

export default CoverageComponent;