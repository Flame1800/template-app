import { connect } from "react-redux";
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';


import mainPageWrapper from './MainPageWrapper.jsx';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
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
    cardCont: {
        overflow: 'auto',
        maxHeight: '70vh',
    },
}));

const useStylesCard = makeStyles({
    root: {
        minWidth: 275,
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});




const mapStateToProps = (state) => {
    const {user, posts, postsFetchingState } = state;
    return { user, posts, postsFetchingState };
}



function Posts(props) {


    const classes = useStyles();
    const classesCard = useStylesCard();

    const { posts, fetchPosts, postsFetchingState, user } = props;

    if (user.name !== null && posts.length === 0) {
        fetchPosts();
    }

    return (
        <React.Fragment>
            {/* Hero unit */}
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Свежие посты в нашем блоге:
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid className={classes.cardCont} container spacing={5} alignItems="flex-end">
                    {postsFetchingState === 'requested' &&
                        <div className='loading'>
                            <CircularProgress color="inherit" />
                        </div>
                    }

                    {postsFetchingState === 'finished' && posts.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Card className={classesCard.root} key={tier.id}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {tier.title}
                                </Typography>
                                <Typography className={classesCard.pos} color="textSecondary">
                                    {tier.body}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </React.Fragment >
    );
}

const newPosts = mainPageWrapper(Posts);


const conntectedComponent = connect(mapStateToProps, null)(newPosts);
export default conntectedComponent;
