import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { toyService } from '../services/toyService';
import { removeToy } from '../store/actions/toyActions';
import Button from '@material-ui/core/Button';
import { ToyChat } from '../cmps/ToyChat';

class _ToyDetails extends Component {
    state = {
        toy: ''
    }
    componentDidMount() {
        const toyId = this.props.match.params.id;
        toyService.getById(toyId)
            .then(toy => this.setState({ toy }))
    }

    onRemoveToy = async () => {
        await this.props.removeToy(this.state.toy._id)
        this.props.history.push('/toy')
    }

    render() {
        const { toy } = this.state
        const  username = this.props.user.username
        if (!toy) return <div>Lopading..</div>
        return (
            <div className="all-details flex column align-center justify-center">
                <section className="toy-details flex align-center justify-center">
                    <img className="details-img" src={toy.imgUrl} alt="" />
                    <section className="toy-info">
                        <h1>Name: {toy.name}</h1>
                        <h3>price: ${toy.price}</h3>
                        <h3>Type: {toy.type}</h3>
                        <h3>{(toy.inStock) ? 'In ' : 'Out Of '} Stock</h3>
                        {/* <Button onClick={this.onRemoveToy}>X</Button> */}
                        <section className="detailts-btns flex space-between">
                            <Button variant="contained" color="primary"
                            ><Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                            </Button>
                            <Button variant="contained" color="primary"
                                onClick={this.onRemoveToy}>X
                    </Button>
                        </section>
                        <Button variant="contained" color="primary">
                            <Link to='/toy' className="details-back">
                                Back To Toys</Link></Button>
                    </section>
                </section>
                <ToyChat toy={toy} username={username} />
            </div>
        )
    }
}

const mapStateToPrpos = state => {
    return {
        toys: state.toyReducer.toys,
        user: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    removeToy
}


export const ToyDetails = connect(mapStateToPrpos, mapDispatchToProps)(_ToyDetails)