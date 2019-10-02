import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import NavBar from './components/navBar';
import BookContainer from './components/bookContainer';

const App = () => {
  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar>
          <TypoGraphy variant="title" color="inherit">
            Henri Potier
          </TypoGraphy>
          <NavBar />
        </Toolbar>
      </AppBar>
      <BookContainer />
    </div>
  );
};

export default App;
