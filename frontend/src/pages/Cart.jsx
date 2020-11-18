import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

import { ItemList } from '../cmps/ItemList'
// import { ItemFilter } from "../cmps/ItemFilter";

const loader = require('../assets/imgs/loading.gif')


class _Cart extends Component {

    onRemoveItem = (itemId) => {
        this.props.removeItem(itemId)
    }

    render() {
        const {cartItems,user} = this.props
        if (!cartItems || !cartItems.length) return (<img src={loader} alt="" />)
        return (
            // <div className="items-app main-container flex column justify-center align-center">
            <div className="cart">
                <h1>Welcome, <span style={{textTransform: "capitalize"}}>{user.fullName}</span></h1>
                <h2>Your cart:</h2>
                <ItemList cls="flex" items={cartItems} />
                {/* <button onClick={this.onNextPage}>Next Page</button> */}
            </div >
        )
        // <div className="items-app main-container flex column justify-center align-center">
        //     <h1>My Items</h1>
        //     <ItemFilter />
        //     <Button variant="contained" color="primary" className="add-item-btn">
        //         <Link to={`/item/edit`} >Add Item</Link>
        //     </Button>
        //     {items.length ? <ItemList items={items} onRemoveItem={this.onRemoveItem}/>
        //         : <h1>No Items To Show</h1>}
        // </div>
        // )
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.userReducer.loggedInUser.cart,
        user: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {

}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(_Cart) 
