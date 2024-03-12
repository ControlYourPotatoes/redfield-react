import React from 'react';
import {Paper, Container, Typography, Card, CardActions, CardContent, CardMedia, Button, Grid, styled } from '@mui/material';

// Ensure CardActionsCentered is visible and correctly placed
const CardActionsCentered = styled(CardActions)({
  justifyContent: 'center',
  transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
  position: 'absolute',
  bottom: '-80%', // Adjust as needed to position at the bottom of the expanded card
  width: '100%',
  opacity: 0,
  visibility: 'hidden',
});

const StyledCard = styled(Card)({
  position: 'relative',
  width: '140px',
  height: '140px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  borderRadius: '70%',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  marginTop: '50px',
  '&:hover': {
    width: '240px',
    height: '340px',
    borderRadius: '15px',
    '.MuiCardContent-root, .MuiCardActions-root': {
      opacity: 1,
      visibility: 'visible',
      top: '1px',
    },
  },
});



const StyledCardMedia = styled(CardMedia)({
  borderRadius: '50%', // Keeps the image round
  width: '140px', // Image width
  height: '140px', // Image height
  boxSizing: 'border-box',
  border: '5px solid white', // White border for the image
  objectFit: 'cover',
  position: 'absolute',
  top: '50%', // Initially position in the middle
  left: '50%',
  transform: 'translate(-50%, -50%)', // Center the image
  transition: 'transform 0.3s ease-in-out, top 0.3s ease-in-out',
  zIndex: 1, // Make sure the image is above other content
  // Only adjust the 'top' property to move the image up without changing its appearance
  // Move image to the top on hover; adjust the percentage as needed
  
});

const CardContentStyled = styled(CardContent)({
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
});

const CardContainer = styled('div')({
  height: '340px', // Maximum height of the card when expanded
  width: '240px', // Maximum width of the card when expanded
  padding: '20px', // Inner space around the content
  margin: '20px', // Space around the outer edges of each card container
  boxSizing: 'border-box',
  display: 'inline-block', // Keeps the card within this allocated space
  marginBottom: '40px', // Adjust as needed for spacing below the cards
});


//data for the cards
const profileCards = [
    {
      name: "Hector Rodriguez",
      role: "Software Engineer, Fullstack Developer",
      imageUrl: "./assets/Profile/Hector.jpg",
      linkedInUrl: "https://www.linkedin.com/in/hector-rodriguez-lopez/",
      
    },
    {
      name: "Carlos Carrasquillo",
      role: "Blockchain Expert, Fullstack web3 Developer",
      imageUrl: "./assets/Profile/Carlos.jpg",
      linkedInUrl: "https://www.linkedin.com/in/carlos-carrasquillo-developer/",
     
    },
    {
      name: "Alexander Puga",
      role: "Smart Contract Developer, Fullstack Developer",
      imageUrl: "./assets/Profile/puga.jpg",
      linkedInUrl: "https://www.linkedin.com/in/pugatech/",
      
    },
  ];


const About: React.FC = () => {
    return (
        <Container id="about" style={{ padding: '50px' }}>
            {/* Cards Row */}
            <Grid container spacing={4} style={{ marginBottom: '40px' }}>
              {profileCards.map((card, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <CardContainer>
                  <StyledCard>  
                  <StyledCardMedia
                  image={card.imageUrl}
                  title={card.name}
                  />
                    <CardContentStyled>
                      <Typography gutterBottom variant="h5" component="div">
                        {card.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.role}
                      </Typography>
                    </CardContentStyled>
                    <CardActionsCentered>
                      <Button size="small" href={card.linkedInUrl} target="_blank">LinkedIn</Button>
                    </CardActionsCentered>
                  </StyledCard>
                  </CardContainer>
                </Grid>
              ))}
            </Grid>

            <Paper elevation={3}
                   style={{ 
                       padding: '20px', 
                       marginTop: '40px',
                       color: 'white', 
                       backgroundColor: 'transparent', // Make background transparent
                       border: '1px solid black', // Add black border
                       borderRadius: '4px', // Optional: adds rounded corners (match your design)
                   }}>

                <Typography variant="h4" gutterBottom>About</Typography>
                <Typography paragraph>
                    Redfiled is an innovative insurance company specializing in hurricane protection, leveraging the power of blockchain technology to offer unique and cutting-edge solutions in the insurance world. Founded by a team of experts in software engineering, blockchain, and smart contracts, our mission is to transform the insurance industry through the use of these advanced technologies, providing our clients unparalleled security and peace of mind in the face of climatic challenges.
                </Typography>
                <Typography paragraph>
                    At Redfiled, we understand that hurricanes can have devastating consequences for individuals, families, and communities. That's why we've developed a revolutionary insurance product that eliminates the complications and delays traditionally associated with insurance claims after a hurricane. Our policy uses blockchain-based smart contract technology to make automatic, predetermined payouts the moment certain climatological parameters, such as hurricane speed and distance, are met. This means that our clients receive payments quickly when they need them most, without the need to file a claim or prove damage.
                </Typography>
                <Typography paragraph>
                    What sets Redfiled apart in the market is our ability to provide an immediate response during critical moments, thanks to our blockchain-based platform. This technology not only ensures transparency and efficiency in the disbursement of payments but also significantly reduces fraud, which in turn allows Redfiled to offer more competitive premiums to our clients.
                </Typography>
                <Typography paragraph>
                    Our commitment to innovation extends beyond our products. At Redfiled, we are constantly exploring new technologies and approaches to improve customer experience, risk management, and operational effectiveness. We firmly believe in the power of technology to change lives and are dedicated to using this power to provide security and support to our clients in the face of unpredictable climate challenges.
                </Typography>
                <Typography paragraph>
                    Choosing Redfiled means choosing a reliable ally that is at the forefront of insurance technology. With Redfiled, you are protected efficiently and effectively, allowing you to face the future with confidence, knowing that we are here to support you every step of the way. We are committed to offering not only security but also peace of mind, through our dedication to excellence, innovation, and customer service. Welcome to Redfiled, where the future of insurance is today.
                </Typography>
            </Paper>
        </Container>
    );
}

export default About;
