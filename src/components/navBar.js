import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography';
import { Home, ShoppingBasket } from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import { inject, observer } from 'mobx-react';

const NavBar = ({ store }) => {
  return (
    <List component="nav">
      <ListItem component="div">
        <ListItemText inset>
          <TypoGraphy color="inherit" variant="h5">
            Accueil <Home />
          </TypoGraphy>
        </ListItemText>

        <ListItemText inset>
          <Badge color="secondary" badgeContent={store.basket.length}>
            <TypoGraphy color="inherit" variant="h5">
              Panier <ShoppingBasket />
            </TypoGraphy>
          </Badge>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default inject('store')(observer(NavBar));
