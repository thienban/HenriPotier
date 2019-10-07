import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography';
import { ShoppingBasket } from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import Dialog from './dialog';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

const NavBar = ({ store }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <List component="nav">
      <ListItem component="div">
        <ListItemText inset>
          <Badge color="secondary" badgeContent={store.basket.length}>
            <TypoGraphy color="inherit" variant="h5" onClick={handleClickOpen}>
              Panier <ShoppingBasket />
            </TypoGraphy>
          </Badge>
          <Dialog open={open} onClose={handleClose} />
        </ListItemText>
      </ListItem>
    </List>
  );
};

NavBar.propTypes = {
  badgeContent: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired
};

NavBar.defaultProps = {
  badgeContent: 0,
  open: false
};

export default inject('store')(observer(NavBar));
