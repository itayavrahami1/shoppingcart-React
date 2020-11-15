import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

import { loadItems } from '../store/actions/itemActions'
import { ItemList } from '../cmps/ItemList'
// import { ItemFilter } from "../cmps/ItemFilter";

const loader = require('../assets/imgs/loading.gif')


class _ShopApp extends Component {
    state = {
        pagination: {
            numOfItems: 2,
            currPage: 0
        }
    }
    componentDidMount() {
        this.props.loadItems()
    }

    itemsToShow = (items) => {
        // const totNumOfPages = items.length / this.state.pagination.numOfItems;

        const initIdx = this.state.pagination.currPage * this.state.pagination.numOfItems;
        const finIdx = initIdx + this.state.pagination.numOfItems;

        const itemsToShow = items.slice(initIdx, finIdx)
        return itemsToShow
    }

    onNextPage = () => {
        this.setState((prevState) => {
            return {
                pagination: {
                    ...prevState.pagination,
                    currPage: (this.state.pagination.currPage + 1 >= this.props.items.length / this.state.pagination.numOfItems) ? 0 : this.state.pagination.currPage + 1
                }
            }
        })
    }

    onRemoveItem = (itemId) => {
        this.props.removeItem(itemId)
    }

    render() {
        const items = this.itemsToShow(this.props.items)
        if (!items || !items.length) return (<img src={loader} alt="" />)
        return (
            // <div className="items-app main-container flex column justify-center align-center">
            <div >
                <h1>My Items</h1>
                <ItemList items={items} />
                <button onClick={this.onNextPage}>Next Page</button>
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
        items: state.itemReducer.items,
    }
}

const mapDispatchToProps = {
    loadItems,
    // removeItem,
}

export const ShopApp = connect(mapStateToProps, mapDispatchToProps)(_ShopApp) 
