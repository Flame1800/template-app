import React from 'react';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
}

class Autoriztaion extends React.Component {
    render() {
        const { user } = this.props;
        if (user.mode) {
            return (
                <div>
                    {user.mode === 'sign-up' ? <SignUp /> : <SignIn />}
                </div>
            );
        }
        return null;
    }
}

const conntectedAutoriztaion = connect(mapStateToProps, null)(Autoriztaion);
export default conntectedAutoriztaion;
