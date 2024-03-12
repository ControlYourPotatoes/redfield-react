import  React, { useState } from 'react';
import { CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Done, DoneAll } from '@mui/icons-material';
import { SxProps, Theme } from '@mui/system';
import styled from '@emotion/styled';
import { Card as MuiCard } from '@mui/material';
import { keyframes } from '@emotion/react';

const colorChange = keyframes`
  0% { box-shadow: inset 0 0 10px red; }
  25% { box-shadow: inset 0 0 10px blue; }
  50% { box-shadow: inset 0 0 10px yellow; }
  75% { box-shadow: inset 0 0 10px orange; }
  100% { box-shadow: inset 0 0 10px red; }
`;
const AnimatedCard = styled(MuiCard)`
  position: relative;
  width: 300px;
  height: 250px;
  display: inline-block;
  background-color: lightgray;
  border-radius: 20px;
  cursor: pointer;
  animation: ${colorChange} 3s infinite; // Use the animation
  &:hover {
    animation: none ; // Optional: pause the animation on hover
  }
`;

 // Define colors for each card type
 const cardColors: { [key: string]: string } = {
  'Standard': 'orange',
  'Premium': 'silver',
};

interface RowData {
  category: string;
  windSpeed: string;
  cost: string;
  price: string;
}

interface GlowPosition {
  x: number;
  y: number;
  intensity: number;
  side?: string; // Make side optional if it's not always present
}

function createData(
  category: string,
  windSpeed: string,
  cost: string,
  price: string
): RowData {
  return { category, windSpeed, cost, price };
}

const standardPolicyRows: RowData[] = [
  createData('Category 5', '≥ 157 mph', '$1,000', '$50'),
  createData('Category 4', '130 - 156 mph', '$450 - $800', '$50'),
  createData('Category 3', '111 - 129 mph', '$150 - $350', '$50'),
  createData('Category 2', '76 - 110 mph', '$50 - $100', '$50'),
  createData('Category 1', '74 - 95 mph', '$25', '$50'),
];

const premiumPolicyRows: RowData[] = [
  createData('Category 5', '≥ 157 mph', '$2,000', '$100'),
  createData('Category 4', '130 - 156 mph', '$900 - $1,600', '$100'),
  createData('Category 3', '111 - 129 mph', '$300 - $700', '$100'),
  createData('Category 2', '76 - 110 mph', '$100 - $200', '$100'),
  createData('Category 1', '74 - 95 mph', '$50', '$100'),
];

const PricingTable = () => {
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);
  const [glowPosition, setGlowPosition] = useState<GlowPosition>({ x: 0, y: 0, intensity: 0 });

  const handleCardClick = (cardTitle: string) => {
    setSelectedCard(cardTitle === selectedCard ? null : cardTitle);
  };

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'done':
        return <Done color="success" />;
      case 'doneAll':
        return <DoneAll color="success" />;
      default:
        return null; // Default case if no iconType is provided
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    const cursorX = e.clientX - cardRect.left;
    const cursorY = e.clientY - cardRect.top;

    // Calculate distances to each side
    const distTop = cursorY;
    const distBottom = cardRect.height - cursorY;
    const distLeft = cursorX;
    const distRight = cardRect.width - cursorX;

    // Find the closest edge
    const edgeDistances: { [key: string]: number } = { top: distTop, bottom: distBottom, left: distLeft, right: distRight };
    const closestEdge: keyof typeof edgeDistances = Object.keys(edgeDistances).reduce((a, b) => edgeDistances[a] < edgeDistances[b] ? a : b) as keyof typeof edgeDistances;


    // Determine glow intensity based on proximity
    const glowIntensity = Math.max(5, 15 - edgeDistances[closestEdge] * 0.5); // Example calculation

    setGlowPosition(prev => ({
      ...prev,
      x: cursorX,
      y: cursorY,
      intensity: glowIntensity,
      // Assuming closestEdge is the variable for `side` and is derived from a process that guarantees a string
      side: closestEdge.toString() // This ensures `side` is explicitly a string
    }));
  };

  const handleMouseOut = () => {
    setGlowPosition({ x: 0, y: 0, intensity: 0 });
  };
  
  // Dynamic glow style based on mouse position
  const dynamicGlow = () => {
    const { side, intensity } = glowPosition;
    let boxShadowValue = '';
    if (side === 'top') boxShadowValue = `inset 0 ${intensity}px 10px -5px rgba(25, 255, 255, 0.7)`;
    else if (side === 'bottom') boxShadowValue = `inset 0 -${intensity}px 10px -5px rgba(255, 25, 255, 0.7)`;
    else if (side === 'left') boxShadowValue = `inset ${intensity}px 0 10px -5px rgba(25, 25, 125, 0.7)`;
    else if (side === 'right') boxShadowValue = `inset -${intensity}px 0 10px -5px rgba(255, 255, 0, 0.7)`;

    return boxShadowValue;
  };

  const cardsInfo = [
    { title: 'Standard', bullets: [' Max Payout $1000'], iconType: 'done', price: '$50', isClickable: false },
    { title: 'Premium', bullets: ['Max Payout $2000'], iconType: 'doneAll', price: '$100', isClickable: false },
    
  ];

  // Separate cards info into two categories for layout purposes
  const triangleCards = [
   { title: 'Standard', bullets: [''], iconType: '', detailsTitle: 'Show Table', isClickable: true },
   { title: 'Premium', bullets: [''], iconType: '', detailsTitle: 'Show Table', isClickable: true },
 ];
  return (
    <div>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          {cardsInfo.map((card, index) => (
          
          <AnimatedCard
          key={index}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
          style={{ boxShadow: dynamicGlow() }} // Apply dynamic glow based on cursor
          onClick={() => card.isClickable && handleCardClick(card.title)}
        >
            <CardContent>
              {/* Use Typography for the card title and apply conditional color based on the card title */}
            <Typography 
              sx={{ 
                fontSize: 30,
                color: 'text.secondary',
                gutterBottom: true,
                backgroundColor: cardColors[card.title], // Use the card title to select the color
                clipPath: 'polygon(0 0, 40% 0%, 80% 100%, 0% 100%)',
                
              }as SxProps<Theme>}
              >
                {card.title}
              </Typography>
              <Typography component="p" style={{ fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '15px 0' }}>
                1 Year
              </Typography>
              {card.bullets.map((bullet, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Typography>{bullet}</Typography>
                  {renderIcon(card.iconType)}
                </div>
              ))}
              <Typography variant="h4" component="p" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '15px 0' }}>
                {card.price}
              </Typography> 
              </CardContent>
              </AnimatedCard>
        
        ))}
      </div>
      <div style={{ display: 'flex', gap: '120px', justifyContent: 'center' }}>
        {triangleCards.map((card, index) => (
          <div
            key={index}
            style={{
              width: '0',
              height: '0',
              borderTop: selectedCard === card.title ? '100px solid transparent' : '100px solid #f0f0f0',
              borderRight: '100px solid transparent',
              borderBottom: '0px solid transparent',
              borderLeft: '100px solid transparent',
              cursor: 'pointer',
              marginBottom: '20px',
              marginTop: '10px',
              position: 'relative',
              
            }}
            onClick={() => card.isClickable && handleCardClick(card.title)}
          > 

          {selectedCard !== card.title && (
            <CardContent style={{ transform: 'translate(-110%, -120%)' }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {card.detailsTitle}
              </Typography>
            </CardContent>
          )}
          </div>
        ))}
      </div>
      {selectedCard ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px',  }}>
          <TableContainer component={Paper} style={{ maxWidth: '80%', overflowX: 'auto' }}>
            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Wind Speed</TableCell>
                  <TableCell align="right">Cost</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(selectedCard === 'Standard' ? standardPolicyRows : premiumPolicyRows).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">{row.category}</TableCell>
                    <TableCell align="right">{row.windSpeed}</TableCell>
                    <TableCell align="right">{row.cost}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
          ) : (
          // Placeholder to maintain layout space when no card is selected
          <div style={{ maxWidth: '80%', height: '222px' }}></div>
      )}
    </div>
  );
};

export default PricingTable;
