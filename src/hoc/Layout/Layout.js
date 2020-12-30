import React, { Component } from 'react';
import Wrapper from '../Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';
import { connect } from 'react-redux';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    showSideDrawerHandler = () => {
        this.setState({showSideDrawer: true})
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }

    
    render() {
        return (<Wrapper>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    toggleDrawerClicked={this.showSideDrawerHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    showSideDrawer={this.state.showSideDrawer} 
                    closeSideDrawer={this.closeSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                </Wrapper>)
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
 }
export default connect(mapStateToProps)(Layout);