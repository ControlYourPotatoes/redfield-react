import { Box, TextField, MenuItem } from '@mui/material'

const MuiSelect = () => {
    return (
        <Box sx={{ minWidth: 120 }}>
            <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value="USD"
                // onChange={handleChange}
                helperText="Please select your currency"
            >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="BTC">BTC</MenuItem>
                <MenuItem value="JPY">JPY</MenuItem>
            </TextField>
        </Box>
    );
};

export default MuiSelect;