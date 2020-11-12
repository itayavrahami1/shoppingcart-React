import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { toyService } from '../services/toyService';
import { saveToy } from '../store/actions/toyActions';

import { TextField, Button, Select, MenuItem } from '@material-ui/core';
// import { Image } from 'cloudinary-react';
import { cloudinaryService } from '../services/cloudinary-service.js';
// import { EditForm } from "../cmps/EditForm";

class _ToyEdit extends Component {
    state = {
        toy: ''
    }
    componentDidMount() {
        const toyId = this.props.match.params.id;
        toyService.getById(toyId)
            .then(toy => this.setState({ toy }))
    }

    onSaveToy = async () => {
        await this.props.saveToy(this.state.toy)
        this.props.history.push('/toy')
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState(prevState => {
            return {
                toy: {
                    ...prevState.toy,
                    [field]: value
                }
            }
        })
    }

    uploadImg = async (ev) => {
        const clousinaryUrl = await cloudinaryService.uploadImg(ev)
        const imgUrl = clousinaryUrl.secure_url;
        this.setState(prevState => {
            return {
                toy: {
                    ...prevState.toy,
                    imgUrl: imgUrl
                }
            }
        },()=>console.log('from upload' ,this.state.toy))
    }

    render() {
        const { toy } = this.state
        return (
            <section className="toy-edit flex column align-center justify-center">
                <img className="edit-img" src={toy.imgUrl} alt="" />
                {/* <EditForm toy={toy}/> */}
                <form className="toy-edit-form flex column align-center justify-center"
                    autoComplete="off" onSubmit={this.onSaveToy}>
                    <input type="hidden" name="id" value={toy._id} />
                    <label htmlFor="toy-name">
                        Name:
                        <TextField type="text" id="toy-name" name="name"
                            value={toy.name} placeholder="Enter toy name"
                            onChange={this.handleChange} />
                    </label>
                    <label htmlFor="toy-price">
                        Price:
                        <TextField type="number" id="toy-price" name="price"
                            value={toy.price} placeholder="Enter toy price"
                            onChange={this.handleChange} />
                    </label>
                    <label htmlFor="toy-type">
                        Type:
                            <Select name="type" id="toy-type"
                            value={toy.type || "Type"}
                            onChange={this.handleChange}>
                            <MenuItem value="Funny">Funny</MenuItem>
                            <MenuItem value="Educational">Educational</MenuItem>
                            <MenuItem value="Adult">Adult</MenuItem>
                        </Select>
                    </label>
                    <label> Choose your toy image!
                        <input onChange={this.uploadImg} type="file" />
                    </label>
                    <Button variant="contained" color="primary" onClick={this.onSaveToy}>Save</Button>
                </form>
                <Button variant="contained" color="primary"><Link to='/toy'>Back</Link></Button>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        toys: state.toyReducer.toys
    }
}

const mapDispatchToProps = {
    saveToy
}


export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)