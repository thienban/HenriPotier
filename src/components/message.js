import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const EmptyMessage = () => (
  <div>
    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      open={true}
      message={<span id="message-id">Pas de livres.</span>}
    />
  </div>
);

export default EmptyMessage;
