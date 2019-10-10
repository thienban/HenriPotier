import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { inject, observer } from 'mobx-react';

const SimpleDialog = props => {
  const { store, onClose, open } = props;

  const handleClose = () => {
    onClose();
  };
  const handleEmpty = () => {
    store.emptyCart();
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Panier</DialogTitle>
      <List>
        {store.basket.map(book => {
          return (
            <ListItem button key={book.id}>
              <ListItemAvatar>
                <Avatar src={book.cover} />
              </ListItemAvatar>
              <ListItemText
                primary={book.title}
                secondary={book.price + ' €'}
              />
            </ListItem>
          );
        })}
        <DialogContent>
          {store.basket.length > 0 && (
            <DialogContentText color="primary">
              {'Total: ' + store.totalOrder + ' €'}
            </DialogContentText>
          )}
          {store.offers.length > 0 && (
            <div>
              <DialogContentText color="error">
                {'Promotion: ' + store.bestOffer + ' €'}
              </DialogContentText>
              <DialogContentText color="error">
                {'Prix Final: ' + (store.totalOrder - store.bestOffer) + ' €'}
              </DialogContentText>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmpty} color="primary">
            Vider
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </List>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default inject('store')(observer(SimpleDialog));
