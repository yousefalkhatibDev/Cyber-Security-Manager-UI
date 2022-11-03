import React, { Component } from "react";

export default class ContentWrapper extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='ContentWrapper'>
                {this.props.children}
            </div>
        )
    }
}
