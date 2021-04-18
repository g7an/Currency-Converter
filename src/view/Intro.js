import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '50vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/weekly?chart)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(2, 1),
    // display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    margin: theme.spacing(5, 10, 5, 10),
  },
  para: {
    margin: theme.spacing(5, 10, 5, 10),
    fontSize: 18,
    lineHeight: 2
  }
}));

export default function Intro() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
    
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      {/* <Title>Here is the Intro! </Title> */}
    <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square >
    <Typography className={classes.title} color="primary" variant="h5" component="h2">
      Gloria's Currency Chart
    </Typography>
    <Typography className={classes.para} variant="body1" gutterBottom>
    With this convenient tool you can review market history and analyse rate trends for many currency pairs. 
    All charts are interactive, and are available for up to a 7-day time period. 
    To see a currency chart, select your two currencies, choose an amount, and click to view.
    </Typography>
    </Grid>
    
    </Grid>
  );
}