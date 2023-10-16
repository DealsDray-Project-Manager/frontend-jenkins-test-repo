import React from 'react';
import { Container, Box, Skeleton } from '@mui/material';

const SkeletonLoader = () => {
  return (
    <Container maxWidth="xl">
      <Box p={3}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 1,
          }}
        >
          <Skeleton variant="text" width={200} height={32} />
        </Box>
        <Box sx={{ mt: 1 }} container spacing={4}>
          <Skeleton variant="text" width="100%" height={64} />
          <Skeleton variant="text" width="100%" height={64} />
          {/* Add more skeletons for other fields */}
        </Box>
      </Box>
    </Container>
  );
};

export default SkeletonLoader;
