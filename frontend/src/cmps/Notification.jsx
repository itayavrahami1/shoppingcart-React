import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearNotification } from '../store/actions/itemActions'


export class _Notification extends Component {
    render() {
        const notification = this.props.notification || ''
        const notificationClass = (notification) ? 'visible':'hidden'
        return notification && 
                <div className={`user-msg ${notificationClass}`} >
                    <h2>{notification}</h2>
                    <button onClick={this.props.clearNotification}>Close</button>
                </div>
    }
}

const mapStateToProps = state => {
    return {
        notification: state.toyReducer.notification
    }
}

const mapDispatchToProps = {
    clearNotification
}

export const Notification = connect(mapStateToProps, mapDispatchToProps)(_Notification) 
