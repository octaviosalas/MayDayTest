import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const SpinnerComponent = () => {
  return (
    <Box sx={{ display: 'flex', alignContent:"center", alignItems: "center",    justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

export default SpinnerComponent

