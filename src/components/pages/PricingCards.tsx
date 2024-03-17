import React from 'react';
import { Box, Card, CardContent, Typography, Chip, List, ListItem, ListItemIcon, ListItemText, Button, Divider } from '@mui/material';
import styled from '@emotion/styled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



const PricingCards = () => {
    return (
        <div >
            <Box sx={{border: '1px solid',padding: '2em', justifyContent:'center'}}>

                <Card sx={{
                    m: '-1rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    mb: 2,
                    width: 320,
                    flexDirection: 'column',
                    borderRadius: '0.25rem',
                    bgcolor: 'rgba(17, 24, 39, 1)',
                    p: '1.5rem',
                }}>
                    <CardContent sx={{ p: 0 }}>
                        <Typography sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 2,
                            flexDirection: 'column',
                        }}>
                        <Typography sx={{fontSize: '3rem',lineHeight: '2rem',fontWeight: 700,color: '#fff',}}>$50</Typography>
                        <Typography sx={{ color: '#fff', paddingTop: '10px', ml:'10px'}}>Standard</Typography>
                        </Typography>

                        <Divider variant="middle" color='lightblue' />

                        <Typography variant="body2" sx={{ color: 'lightblue', mb: 2, mt: 1, ml: 4 }}>
                        Etiam ac convallis enim, eget euismod
                        </Typography>
                        <List>
                        {["24/7 Monitoring", "Automted Payout", "Max Payout $1000"].map((text, index) => (
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

                    <Card sx={{
                    m: '-1rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    mb: 2,
                    width: 320,
                    flexDirection: 'column',
                    borderRadius: '0.25rem',
                    bgcolor: 'rgba(17, 24, 39, 1)',
                    p: '1.5rem',
                }}>
                    <CardContent sx={{ p: 0 }}>
                        <Typography sx={{display: 'flex',justifyContent: 'center',mb: 2,flexDirection: 'column'}}>
                            <Typography sx={{ fontSize: '3rem', lineHeight: '2rem', fontWeight: 700, color: '#fff', }}>$100</Typography>
                            <Typography sx={{ color: '#fff', paddingTop: '10px', ml: '10px', fontSize: '1.3rem' }}>Premium</Typography>
                        </Typography>

                        <Divider variant="middle" color='lightblue' />

                        <Typography variant="body2" sx={{ color: 'lightblue', mb: 2, mt: 1, ml: 4 }}>
                            Exclusive access to advanced features.
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
            </Box>
            
        </div>
    );
};

export default PricingCards;