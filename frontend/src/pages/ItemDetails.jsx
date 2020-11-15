import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { itemService } from '../services/itemService';
import { removeItem } from '../store/actions/itemActions';
import Button from '@material-ui/core/Button';

class _ItemDetails extends Component {
    state = {
        item: ''
    }
    componentDidMount() {
        const itemId = this.props.match.params.id;
        console.log('mount',itemId);
        itemService.getById(itemId)
            .then(item => this.setState({ item }))
    }

    onRemoveItem = async () => {
        await this.props.removeItem(this.state.item._id)
        this.props.history.push('/')
    }

    render() {
        const { item } = this.state
        if (!item) return <div>Lopading..</div>
        return (
            <div className="all-details flex column align-center justify-center">
                <section className="item-details flex align-center justify-center">
                    <img className="details-img" src={item.imgURL} alt="" />
                    <section className="item-info">
                        <h1>Name: {item.name}</h1>
                        <h3>price: ${item.price}</h3>
                        <section className="detailts-btns flex space-between">
                            <Button variant="contained" color="primary"
                            ><Link to={`/item/edit/${item._id}`}>Edit</Link>
                            </Button>
                            <Button variant="contained" color="primary"
                                onClick={this.onRemoveItem}>X
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
    removeItem
}


export const ItemDetails = connect(mapStateToPrpos, mapDispatchToProps)(_ItemDetails)