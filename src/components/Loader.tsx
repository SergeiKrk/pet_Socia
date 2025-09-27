import { CircularProgress, Stack } from '@mui/material';
export const Loader = () => (
  <Stack display="flex" justifyContent="center" alignItems="center" py={3}>
    <CircularProgress />
  </Stack>
);