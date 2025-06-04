import { Box, LinearProgress, Typography, Stack } from '@mui/material';

const ReviewBar = ({ label, value, total }) => {
  const percentage = (value / total) * 100;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="body2" sx={{ width: 50 }}>{label}</Typography>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{ flexGrow: 1, height: 8, borderRadius: 5, backgroundColor: 'transparent' }}
      />
      <Typography variant="body2" sx={{ width: 50, textAlign: 'right' }}>
        {value}
      </Typography>
    </Stack>
  );
};
export default ReviewBar;