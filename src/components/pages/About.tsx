import React from 'react';
import { Container, Typography, Paper, Card , CardActions, CardContent, CardMedia, Button, Grid, styled } from '@mui/material';

// Style the CardActions to center the content
const CardActionsCentered = styled(CardActions)({
    justifyContent: 'center',
    marginBottom: '8px',
  });
  
  // Style the Card for hover effect
  const StyledCard = styled(Card)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)', // Adjust scale value as needed
    },
    borderRadius: '15px', // Keeps the card's corners rounded
    overflow: 'hidden',
  });
  
  const CardContentStyled = styled(CardContent)({
    color: 'black', // Set your desired text color
  });

//data for the cards
const profileCards = [
    {
      name: "Hector Rodriguez",
      role: "Software Engineer, Fullstack Developer",
      imageUrl: "https://placehold.co/200x200",
      linkedInUrl: "https://www.linkedin.com/in/hector-rodriguez-lopez/",
      backgroundImage: "https://placehold.co/600x400", // Background image URL
      //backgroundColor: "#ffebee", // Example background color
    },
    {
      name: "Carlos Carrasquillo",
      role: "Blockchain Expert, Fullstack web3 Developer",
      imageUrl: "./assets/Profile/Carlos.jpg",
      linkedInUrl: "https://www.linkedin.com/in/carlos-carrasquillo-developer/",
      backgroundImage: "https://placehold.co/600x400", // Background image URL
    },
    {
      name: "Alexander Puga",
      role: "Smart Contract Developer, Fullstack Developer",
      imageUrl: "https://placehold.co/600x400",
      linkedInUrl: "https://www.linkedin.com/in/pugatech/",
      backgroundImage: "https://placehold.co/600x400", // Background image URL
    },
  ];


const About: React.FC = () => {
    return (
        <Container id="about">
            {/* Cards Row */}
            <Grid container spacing={4} style={{ marginBottom: '20px' }}>
              {profileCards.map((card) => (
                <Grid item xs={12} sm={4} key={card.name}>
                  <StyledCard style={{ backgroundImage: `url(${card.backgroundImage})` }}>  
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.imageUrl}
                    alt={card.name}
                    style={{
                    width: '140px',
                    borderRadius: '50%',
                    margin: '20px auto 10px', // Adjust margin to center the image and provide spacing
                    objectFit: 'cover',
                    }}
                />
                    <CardContentStyled>
                      <Typography gutterBottom variant="h5" component="div" style={{color: 'yourColorHere'}}>
                        {card.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" style={{color: 'yourColorHere'}}>
                        {card.role}
                      </Typography>
                    </CardContentStyled>
                    <CardActionsCentered>
                      <Button size="small" href={card.linkedInUrl} target="_blank">LinkedIn</Button>
                    </CardActionsCentered>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>

            <Paper elevation={3} 
                   style={{ 
                       padding: '20px', 
                       marginTop: '20px',
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
