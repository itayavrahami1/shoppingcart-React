import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { itemService } from '../services/itemService';
import { removeItem } from '../store/actions/itemActions';
import Button from '@material-ui/core/Button';
import { addToCart } from '../store/actions/userActions';

class _ItemDetails extends Component {
    state = {
        item: ''
    }
    componentDidMount() {
        const itemId = this.props.match.params.id;
        itemService.getById(itemId)
            .then(item => this.setState({ item }))
    }
    // UPDATING USER - UPDATING USER CART
    onAddToCart = async (item) => {
        if (!this.props.user) this.props.history.push('/')
        
        // if (this.props.user.cart) {this.props.user.cart.push(item)}
        // else {this.props.user.cart = [item]}
        // await this.props.addToCart(this.props.user)
        await this.props.addToCart(this.props.user, item)
        this.props.history.push('/')
    }

    render() {
        const { item } = this.state
        if (!item) return <div>Loading..</div>
        return (
            <div className="all-details flex column align-center justify-center">
                <section className="item-details flex align-center justify-center">
                    <img className="details-img" src={item.imgURL} alt="" />
                    <section className="item-info">
                        <h1>Name: {item.name}</h1>
                        <h3>price: ${item.price}</h3>
                        <section className="detailts-btns flex space-between">
                            <Button variant="contained" color="primary"
                                onClick={() => this.onAddToCart(item)}>Add To Cart
                            </Button>
                        </section>
                        <Button variant="contained" color="primary">
                            <Link to='/' className="details-back">
                                Back To Items</Link></Button>
                    </section>
                </section>
            </div>
        )
    }
}

const mapStateToPrpos = state => {
    return {
        items: state.itemReducer.items,
        user: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    removeItem,
    addToCart
}


export const ItemDetails = connect(mapStateToPrpos, mapDispatchToProps)(_ItemDetails)