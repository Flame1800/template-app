import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import * as actions from "../../actions/index.js";




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Carcass
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const actionCreators = {
  changeMode: actions.changeMode,
  loginUser: actions.loginUser,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { stateUser: user };
}



function SignIn(props) {
  const classes = useStyles();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const changeMode = () => props.changeMode('sign-up');

  const changeInputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    switch (name) {
      case 'mail':
        setMail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  }


  const submitFormHandler = (e) => {
    e.preventDefault();
    const user = { mail, password };
    props.loginUser({ user });
  }

  const { stateUser } = props;
  
  const loginErr = stateUser.err ? true : false;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form className={classes.form} onSubmit={submitFormHandler} >

          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            name="mail"
            autoComplete="email"
            value={mail}
            onChange={changeInputHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={changeInputHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs={12}>
              {loginErr && <div>Неправильный логин или пароль.</div>}

            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={changeMode}>
                {"У вас еще нет аккаунта? Зарегистрируйтесь"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}


const conntectedSignIn = connect(mapStateToProps, actionCreators)(SignIn)
export default conntectedSignIn;