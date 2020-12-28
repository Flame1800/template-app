import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import * as actions from "../../actions/index.js";
import axios from 'axios';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const actionCreators = {
  changeMode: actions.changeMode,
  addUser: actions.addUser,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { stateUser: user };
}


function SignUp(props) {
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState(false);
  const [mailErr, setMailErr] = useState(false);
  const [loginErr, setLoginErr] = useState(false);

  const classes = useStyles();
  const changeMode = () => props.changeMode('sign-in');

  const changeInputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'surName':
        setSurName(value);
        break;
      case 'mail':
        setMail(value);
        break;
      case 'password':
        setPassword(value)
        break;
      default:
        break;
    }
  }

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const user = { name, surName, mail, password };
    const re = RegExp(/^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/);

    if (password.length < 6) {
      setPasswordErr(true);
      return;
    }
    else {
      setPasswordErr(false);
    }

    if (re.test(mail) === false) {
      setMailErr(true);
      return;
    } else {
      setMailErr(false);
    }

    const data = await axios.get('http://localhost:4000/users');
    const users = data.data;
    const filteredUsers = users.filter(currUser => currUser.mail === user.mail);

    if (filteredUsers.length > 0) {
      setLoginErr(true);
      return;
    } else {
      setLoginErr(false);
      props.addUser({ user });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form className={classes.form} onSubmit={submitFormHandler} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Имя"
                autoFocus
                value={name}
                onChange={changeInputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="surName"
                label="Фамилия"
                name="surName"
                autoComplete="lname"
                value={surName}
                onChange={changeInputHandler}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Зарегистрироваться
          </Button>
          <Grid item xs={12}>
            {passwordErr && <div>Пароль должен быть не менее 6 символов</div>}
            {mailErr && <div>Введен некоректный Email</div>}
            {loginErr && <div>Этот email уже занят</div>}

          </Grid>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={changeMode}>
                У вас уже есть аккаунт? Войдите
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}


const conntectedSignUp = connect(mapStateToProps, actionCreators)(SignUp)
export default conntectedSignUp;