import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadToys } from "../store/actions/toyActions.js";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';


export class _ToyFilter extends Component {

    state = {
        name: '',
        type: '',
        inStock: undefined
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = (field === 'inStock') ? target.checked : target.value
        this.setState({ [field]: value }, () => this.props.loadToys(this.state))
    }


    render() {
        return (
            <section className="toy-filter flex column align-center justify-center" >
                <h2>Toy Filter</h2>
                <section className="filter-fields flex align-center">
                    <label >
                        Name:
                    <TextField type="text" name="name" autoComplete="off"
                            onChange={this.handleChange} />
                    </label>

                    <label >
                        In Stock:
                    <Checkbox type="checkbox" name="inStock"
                            onChange={this.handleChange} />
                    </label>

                    <label>
                        Type:
                    <Select name="type" onChange={this.handleChange}>
                            <MenuItem value="Funny">Funny</MenuItem>
                            <MenuItem value="Educational">Educational</MenuItem>
                            <MenuItem value="Adult">Adult</MenuItem>
                        </Select>
                    </label>
                </section>
            </section >
        )
    }
}

const mapStateToProps = state => {
    return {
        toys: state.toyReducer.toys
    }
}

const mapDispatchToProps = {
    loadToys
}

export const ToyFilter = connect(mapStateToProps, mapDispatchToProps)(_ToyFilter) 
