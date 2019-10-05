import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography';
import { Home, ShoppingBasket } from '@material-ui/icons';

const NavBar = () => {
  return (
    <List component="nav">
      <ListItem component="div">
        <ListItemText inset>
          <TypoGraphy color="inherit" variant="h5">
            Accueil <Home />
          </TypoGraphy>
        </ListItemText>

        <ListItemText inset>
          <TypoGraphy color="inherit" variant="h5">
            Panier <ShoppingBasket />
          </TypoGraphy>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default NavBar;
