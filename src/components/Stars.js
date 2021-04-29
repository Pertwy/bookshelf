import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function HalfRating(props) {
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating name="half-rating" defaultValue={0} precision={0.5} onChange={({ target}) => props.setRating(target.value)}/>     
    </div>
  );
}