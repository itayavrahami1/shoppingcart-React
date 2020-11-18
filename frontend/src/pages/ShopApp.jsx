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
            numOfItems: 3,
            currPage: 0
        }
    }
    componentDidMount() {
        this.props.loadItems()
    }

    itemsToShow = (items) => {
        const initIdx = this.state.pagination.currPage * this.state.pagination.numOfItems;
        const finIdx = initIdx + this.state.pagination.numOfItems;

        const itemsToShow = items.slice(initIdx, finIdx)
        return itemsToShow
    }

    onNextPrevPage = (diff) => {
        const defaultPage = this.state.pagination.currPage + diff;

        this.setState((prevState) => {
            return {
                pagination: {
                    ...prevState.pagination,
                    currPage: defaultPage
                }
            }
        })
    }

    getPrevNextBtnsClass = () => {
        let clsName = ['', '']
        clsName[0] = (this.state.pagination.currPage !== 0) ? '' : 'hide'
        clsName[1] = ((this.state.pagination.currPage + 1) < this.props.items.length / this.state.pagination.numOfItems) ? '' : 'hide'
        return clsName

    }

    onRemoveItem = (itemId) => {
        this.props.removeItem(itemId)
    }

    render() {
        const items = this.itemsToShow(this.props.items)
        if (!items || !items.length) return (<img src={loader} alt="" />)
        return (
            // <div className="items-app main-container">
            <div className="items-app main-container">
                <ItemList cls="flex grid card-grid" items={items} />
                <section className="prevNext-btns flex space-between">
                    <button className={this.getPrevNextBtnsClass()[0]} onClick={() => this.onNextPrevPage(-1)}>Previous Page</button>
                    <button className={this.getPrevNextBtnsClass()[1]} onClick={() => this.onNextPrevPage(1)}>Next Page</button>
                </section>
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
