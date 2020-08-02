import React from 'react';
import Autorization from './components/Autorization';
import Posts from './components/Posts.jsx';
import { connect } from "react-redux";


const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
}


class App extends React.Component {

  render () {
    const { user } = this.props;
    
    return (
      <div className="App">
        {user.name !== null ? <Posts /> : <Autorization />}
      </div>
    );
  }
  
}

const conntectedApp = connect(mapStateToProps, null)(App);
export default conntectedApp;

