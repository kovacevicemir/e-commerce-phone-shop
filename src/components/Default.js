import React, { Component } from 'react'

export default class Default extends Component {
    render() {
        const urlattempt = this.props.location.pathname
        return (
            <div className='container mt-5'>
                <h3>Not found! 404</h3>
                <p className="lead text-break">{`We could not find www.e-commercephone${urlattempt} on this website!`}</p>
            </div>
        )
    }
}
