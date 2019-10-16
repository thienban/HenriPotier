import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  progress: {
    flexGrow: 1
  }
});
const LoadingIndicator = () => {
  const classes = useStyles();
  return (
    <div className={classes.progress}>
      <LinearProgress />
      <br />
      <LinearProgress color="secondary" />
    </div>
  );
};
export default LoadingIndicator;
