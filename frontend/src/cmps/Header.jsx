import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import { logout } from '../store/actions/userActions';

class _Header extends Component {

    onLogout = () => {
        this.props.logout()
        this.props.history.push('/login')
    }

    render() {
        const { user } = this.props;
        const cart = (user) ? user.cart:null;

        return (
            <header className="main-header">
                <h1>e-Shop</h1>
                <section className="navbar-menu flex align-center">
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/cart">Cart {(cart && cart.length) ? `[${cart.length}]` : ''}</NavLink> |
                    {(user) ?
                        <div className="login-link" onClick={this.onLogout}>Logout</div>
                        : <NavLink to="/login">Login/Signup</NavLink>}
                </section>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.loggedInUser,
    }
}

const mapDispatchToProps = {
    logout
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withRouter((_Header)))
// export function Header() {
//     return (
//         <header className="main-header">
//             <h1>e-Shop</h1>
//             <section className="navbar-menu flex align-center">
//                 <NavLink to="/" className="home-link">Home</NavLink> |
//                 <NavLink to="/cart" className="toys-link">Cart</NavLink> |
//                 <NavLink to="/login" >Login/Signup</NavLink>
//             </section>
//         </header>
//     )
// }
