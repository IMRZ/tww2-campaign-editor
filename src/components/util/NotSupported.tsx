import React from 'react';
import { Box, Link } from '@material-ui/core';

// https://caniuse.com/native-filesystem-api
// https://wicg.github.io/file-system-access/

const NotSupported = () => {
  return (
    <Box height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <div>BROWSER NOT SUPPORTED</div>
      <Link
        href="https://caniuse.com/native-filesystem-api"
        rel="noopener noreferrer"
        target="_blank"
      >
        Click here for a list of supported browser
      </Link>
    </Box>
  );
};

export default NotSupported;
