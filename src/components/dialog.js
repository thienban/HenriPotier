import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import { inject, observer } from 'mobx-react';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

const SimpleDialog = props => {
  const classes = useStyles();
  const { store, onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
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
            <ListItem
              button
              onClick={() => handleListItemClick(book)}
              key={book.id}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar} src={book.cover} />
              </ListItemAvatar>
              <ListItemText primary={book.title} secondary={book.price+' €'} />
            </ListItem>
          );
        })}
        <DialogActions>
          <Button onClick={handleListItemClick} color="primary">
            Annuler
          </Button>
          <Button onClick={handleListItemClick} color="primary">
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
