import { Typography, Box } from '@mui/material';

const StartComponent = () => {
    return (
        <div>
            <Box component="div" sx={{ padding: 2, background: 'lightgray', borderRadius: 1, justifyContent: 'center'   }} >
                <Typography variant="h3" align="center" sx={{ marginBottom: 2 }}>
                    Experience Insurance Reimagined
                </Typography>
                <div>
                    <img 
                        src="\assets\svg\insurance-svgrepo-com.svg" 
                        alt="Insurance" 
                        style={{ 
                            width: '20%', 
                            display: 'block',  // Make it a block-level element
                            marginLeft: 'auto',  // Auto margin on the left
                            marginRight: 'auto', // Auto margin on the right
                            marginBottom: '2rem'
                        }} 
                    />
                    <img 
                        src="\assets\icon\edited_logo.png" 
                        alt="Insurance" 
                        style={{ 
                            width: '20%', 
                            display: 'block',  // Make it a block-level element
                            marginLeft: 'auto',  // Auto margin on the left
                            marginRight: 'auto', // Auto margin on the right
                            marginBottom: '2rem'
                        }} 
                    />
                </div>
                <Typography variant="body1" align="center" sx={{ marginBottom: 4 }}>
                    No evaluations, no waiting—just instant, reliable coverage.
                </Typography>
            </Box>
        </div>
    );
};

export default StartComponent;
