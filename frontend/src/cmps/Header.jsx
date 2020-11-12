import React from 'react'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
        <header className="main-header">
            <h1>e-Shop</h1>
            <section className="navbar-menu flex align-center">
                <NavLink to="/" className="home-link">Home</NavLink> |
                <NavLink to="/toy" className="toys-link">Cart</NavLink>
            </section>
        </header>
    )
}
