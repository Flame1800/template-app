import React from 'react';
import HomePage from './HomePage.jsx';


function changeTheme(WrappedComponent, theme) {
    // ...и возвращает другой компонент...
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.handleChangetheme = this.handleChangeTheme.bind(this);
        this.state = {
          data: theme
        };
      }
  
      handleChangeTheme() {
        this.setState({
          data: theme
        });
      }
  
      render() {
        return <WrappedComponent theme={this.state.data} {...this.props} />;
      }
    };
  }


  export default (theme) => changeTheme(HomePage, theme);