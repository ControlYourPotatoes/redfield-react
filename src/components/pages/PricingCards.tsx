import React from 'react';
import { Box, Card, CardContent, Typography, Chip, List, ListItem, ListItemIcon, ListItemText, Button, Divider } from '@mui/material';
import styled from '@emotion/styled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



const PricingCards = () => {
    return (
        <div>
            <div style={{display: 'flex',justifyContent: 'space-evenly',alignItems: 'center',marginBottom: '2em'}}>
                <Card sx={{
                    m: '-1rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    mb: 2,
                    width: 320,
                    flexDirection: 'column',
                    borderRadius: '1rem',
                    background: 'radial-gradient(circle at 47% 42%,rgba(16, 16, 18, 1), rgba(9, 10, 42, 1), rgba(14, 29, 77, 1))',
                    p: 'rem',
                }}>
                    <CardContent sx={{ p: 1, m:'10px' }}>
                        <Box>
                            <Box sx={{ background: 'url(/assets/svg/Rectangleblur.svg) center center / cover no-repeat', padding: '1rem', borderRadius: '.5rem', mb:'10px' }}>
                                <Typography sx={{display: 'flex',justifyContent: 'center',mb: '',flexDirection: 'column',textAlign: 'center'}}>
                                    <Typography sx={{fontSize: '3rem',lineHeight: '2rem',fontWeight: 700,color: '#fff'}}>$50</Typography>
                                    <Typography sx={{ color: '#fff', paddingTop: '10px', ml:'10px', fontSize: '1.3rem'}}>Standard</Typography>
                                </Typography>  
                            </Box>   
                            

                            <Divider variant="middle" color='lightblue' />
                                <Typography variant="body2" sx={{ color: 'lightblue', mb: 2, mt: 1, ml: 4 }}>
                                    {/* Powered By Chainlink */}
                                </Typography>
                                                        
                            <Box sx={{ padding: '1rem' }}>
                                <List>
                                {["24/7 Monitoring", "Automated Payout", "Max Payout $1000"].map((text, index) => (
                                    <ListItem key={index} sx={{ p: 0, color: '#fff' }}>
                                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                        <CheckCircleIcon color="success" />
                                    </ListItemIcon>
                                    <ListItemText primary={text} primaryTypographyProps={{ style: { color: '#fff' } }} />
                                    </ListItem>
                                ))}
                                </List>
                                <Button variant="contained">Show Table</Button>
                            </Box> 
                        </Box>
                        
                        
                    </CardContent>
                </Card>

                <Card sx={{
                    m: '-1rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    mb: 2,
                    width: 320,
                    flexDirection: 'column',
                    borderRadius: '0.50rem',
                    background: 'radial-gradient(circle at 56% 0%,#000000, #26153c, rgba(46, 19, 78, 1))',
                    p: '1.5rem',
                }}>
                <CardContent sx={{ p: 0 }}>
                    <Typography sx={{display: 'flex',justifyContent: 'center',mb: 2,flexDirection: 'column',textAlign: 'center'}}>
                        <Typography sx={{ fontSize: '3rem', lineHeight: '2rem', fontWeight: 700, color: '#fff', }}>$100</Typography>
                        <Typography sx={{ color: '#fff', paddingTop: '10px', ml: '10px', fontSize: '1.3rem' }}>Premium</Typography>
                    </Typography>

                    <Divider variant="middle" color='lightblue' />

                    <Typography variant="body2" sx={{ color: 'lightblue', mb: 2, mt: 1, ml: 4 }}>
                        {/* Exclusive access to advanced features. */}
                    </Typography>
                    <List>
                        {["24/7 Premium Support", "Automated Payout", "Max Payout $2000"].map((text, index) => (
                            <ListItem key={index} sx={{ p: 0, color: '#fff' }}>
                                <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                    <CheckCircleIcon color="success" />
                                </ListItemIcon>
                                <ListItemText primary={text} primaryTypographyProps={{ style: { color: '#fff' } }} />
                            </ListItem>
                        ))}
                    </List>
                    <Button variant="contained">Show Table</Button>
                </CardContent>
            </Card>
            </div>
        </div>
    );
};

export default PricingCards;