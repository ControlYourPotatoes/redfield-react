import { Stack, Button } from "@mui/material";

export const MuiButton = () => {
  return (
    <Stack spacing={5} direction={"row"} >
        <Button variant="contained" color="primary" href="https://google.com">Material UI</Button>
        <Button variant="outlined" color="secondary">Material UI</Button>
        <Button variant="text" color="error">Material UI</Button>
    </Stack>
  )
}
