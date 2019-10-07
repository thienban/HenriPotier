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
import { blue } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
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
        {store.basket.map(book => (
          <ListItem
            button
            onClick={() => handleListItemClick(book)}
            key={book.isbn}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>{book.cover}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={book.title} />
          </ListItem>
        ))}

        <ListItem button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <CheckIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="CONFIRMER" />
        </ListItem>
      </List>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default inject('store')(observer(SimpleDialog));
