import { connect } from "react-redux";
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import * as actions from "../actions/index.js";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="*">
                Contact
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    ContApp: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
    },
    cardCont: {
        overflow: 'auto',
        maxHeight: '70vh',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
    }
}));

const mapStateToProps = (state) => {
    const { user, posts, postsFetchingState } = state;
    return { user, posts, postsFetchingState };
}

const actionCreators = {
    logoutUser: actions.logoutUser,
    fetchPosts: actions.fetchPosts,
};


export default (Component) => {

    function OutputComponent(props) {
        const [darkMode, setDarkMode] = React.useState(false);
        const [snakCoockie, setSnakCookie] = React.useState(true);

        const classes = useStyles();


        const theme = createMuiTheme({
            palette: {
                type: darkMode ? 'dark' : 'light',
            },
        });

        const { user } = props;

        const logoutUserHandler = () => props.logoutUser()

        const changeTheme = () => setDarkMode(!darkMode);

        const handleCloseSnak = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }

            setSnakCookie(false);
        };


        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <div className={classes.ContApp}>
                        <CssBaseline />
                        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                            <Toolbar className={classes.toolbar}>
                                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                                    CONTACT
                                </Typography>
                                <nav className={classes.nav}>

                                    <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                                        {user.name} {user.surName}
                                    </Link>
                                    <Link variant="button" color="textPrimary" href="#" className={classes.link} onClick={changeTheme}>
                                        {!darkMode ? <Brightness4Icon /> : <BrightnessHighIcon />}
                                    </Link>
                                </nav>

                                <Button href="#" color="default" variant="outlined" className={classes.link} onClick={logoutUserHandler}>
                                    Выйти
                                </Button>
                            </Toolbar>
                        </AppBar>

                        <Component {...props} />

                        {/* Footer */}
                        <footer className={classes.footer}>
                            <Container maxWidth="sm">
                                <Copyright />
                            </Container>
                        </footer>
                        {/* End footer */}
                    </div>
                </React.Fragment>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={snakCoockie}
                    autoHideDuration={6000}
                    onClose={handleCloseSnak}
                    message="Добро пожаловать в CONTACT!"
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnak}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </MuiThemeProvider>
        );

    };

    const conntectedComponent = connect(mapStateToProps, actionCreators)(OutputComponent);
    return conntectedComponent;

}



