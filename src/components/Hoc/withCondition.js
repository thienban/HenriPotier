import { compose } from 'recompose';
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  progress: {
    flexGrow: 1
  }
});

const withMaybe = conditionalRenderingFn => Component => props =>
  conditionalRenderingFn(props) ? null : <Component {...props} />;
const withEither = (
  conditionalRenderingFn,
  EitherComponent
) => Component => props =>
  conditionalRenderingFn(props) ? (
    <EitherComponent />
  ) : (
    <Component {...props} />
  );

const EmptyMessage = () => (
  <div>
    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      open={true}
      message={<span id="message-id">Pas de livres.</span>}
    />
  </div>
);
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

const isLoadingConditionFn = props => props.state === 'loading';
const nullConditionFn = props => !props.books;
const isEmptyConditionFn = props => !props.books.length;

const withConditionalRender = compose(
  withEither(isLoadingConditionFn, LoadingIndicator),
  withMaybe(nullConditionFn),
  withEither(isEmptyConditionFn, EmptyMessage)
);

export default withConditionalRender;
