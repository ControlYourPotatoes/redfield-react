import React, {useState} from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Define a type for the table parameter
type TableType = 'Standard' | 'Premium' | null;

const standardPolicyRows = [
    { category: '1', windSpeed: '74 - 75 mph', payout: '$25',  price: '$50' },
    { category: '2', windSpeed: '76 - 110 mph', payout: '$50 - $100', price: '$50' },
    { category: '3', windSpeed: '111 - 129 mph', payout: '$150 - $350', price: '$50' },
    { category: '4', windSpeed: '130 - 156 mph', payout: '$450 - $800', price: '$50' },
    { category: '5', windSpeed: '≥ 157 mph', payout: '$1,000', price: '$50' },
    // Add more rows as needed
  ];
  
  const premiumPolicyRows = [
    { category: '1', windSpeed: '74 - 75 mph', payout: '$50', price: '$100' },
    { category: '2', windSpeed: '76 - 110 mph', payout: '$100 - $200', price: '$100' },
    { category: '3', windSpeed: '111 - 129 mph', payout: '$300 - $700', price: '$100'  },
    { category: '4', windSpeed: '130 - 156 mph', payout: '$900 - $1,600', price: '$100'  },
    { category: '5', windSpeed: '≥ 157 mph', payout: '$2000', price: '$100'  },
    // Add more rows as needed
  ];

  
  const PricingCards = () => {
    const [visibleTable, setVisibleTable] = useState<TableType>(null);

    const toggleTable = (table: TableType) => {
        setVisibleTable(visibleTable !== table ? table : null);
    };
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
                                <Button variant="contained" onClick={() => toggleTable('Standard')}>Show Table</Button>
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
                    borderRadius: '1rem',
                    background: 'radial-gradient(circle at 47% 42%,rgba(16, 16, 18, 1), rgba(9, 10, 42, 1), rgba(14, 29, 77, 1))',
                    p: 'rem',
                }}>
                    <CardContent sx={{ p: 1, m:'10px' }}>
                        <Box>
                            <Box sx={{ background: 'url(/assets/svg/Rectangleblur.svg) center center / cover no-repeat', padding: '1rem', borderRadius: '.5rem', mb:'10px' }}>
                                <Typography sx={{display: 'flex',justifyContent: 'center',mb: '',flexDirection: 'column',textAlign: 'center'}}>
                                    <Typography sx={{fontSize: '3rem',lineHeight: '2rem',fontWeight: 700,color: '#fff'}}>$100</Typography>
                                    <Typography sx={{ color: '#fff', paddingTop: '10px', ml:'10px', fontSize: '1.3rem'}}>Premium</Typography>
                                </Typography>  
                            </Box>   
                            

                            <Divider variant="middle" color='lightblue' />
                                <Typography variant="body2" sx={{ color: 'lightblue', mb: 2, mt: 1, ml: 4 }}>
                                    {/* Powered By Chainlink */}
                                </Typography>
                                                        
                            <Box sx={{ padding: '1rem' }}>
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
                                <Button variant="contained" onClick={() => toggleTable('Premium')}>Show Table</Button>
                            </Box> 
                        </Box>
                    </CardContent>
                </Card>
                </div>
                
                 <div style={{ minHeight: '220px' }}>
            {/* Standard Table */}
            {visibleTable === 'Standard' && (
                <TableContainer component={Paper} sx={{ maxWidth: '80%', overflowX: 'auto', margin: 'auto' }}>
                    <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                        {/* Table Structure */}
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell align="right">Wind Speed</TableCell>
                                <TableCell align="right">Payout</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {standardPolicyRows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{row.category}</TableCell>
                                    <TableCell align="right">{row.windSpeed}</TableCell>
                                    <TableCell align="right">{row.payout}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
      


       {/* Premium Table */}
       {visibleTable === 'Premium' && (
                <TableContainer component={Paper} style={{ maxWidth: '80%', overflowX: 'auto', margin: 'auto' }}>
          <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">Wind Speed</TableCell>
                <TableCell align="right">Payout</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {premiumPolicyRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.category}</TableCell>
                  <TableCell align="right">{row.windSpeed}</TableCell>
                  <TableCell align="right">{row.payout}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
            </TableContainer>
      )}
      </div>
            </div>

    );
};

export default PricingCards;