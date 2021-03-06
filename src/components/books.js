import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  text: {
    maxWidth: '25em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

const ListBook = ({ books, handleBuy, inputFilter, handleFilter }) => {
  const classes = useStyles();
  const handleClick = e => {
    handleBuy(e.currentTarget.id);
  };
  const filter = e => {
    handleFilter(e.target.value);
  };
  return (
    <div style={{ marginTop: 20, padding: 30 }}>
      <TextField
        id="standard-full-width"
        label="Livre à chercher"
        style={{ margin: 8 }}
        placeholder="Recherche"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        value={inputFilter}
        onChange={filter}
      />
      <Grid container spacing={5} justify="center">
        {books.map(book => {
          return (
            <Grid item key={book.isbn}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="henry"
                    className={classes.media}
                    image={book.cover}
                  />
                  <CardContent>
                    <Typography variant="subtitle2" component="h2">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" className={classes.text}>
                      {book.synopsis[0]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    id={book.isbn}
                    onClick={e => handleClick(e)}
                  >
                    ACHETER
                  </Button>
                  <Avatar>{book.price + ' €'}</Avatar>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

ListBook.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      cover: PropTypes.string.isRequired,
      synopsis: PropTypes.array.isRequired
    })
  )
};

export default ListBook;
