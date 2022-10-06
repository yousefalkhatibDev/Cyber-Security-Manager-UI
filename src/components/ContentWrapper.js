import React, { Component } from 'react'

export default class ContentWrapper extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{ minHeight: "100vh" }}>
                {this.props.children}
            </div>
        )
    }
}
