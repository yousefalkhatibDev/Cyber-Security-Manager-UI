import React, { Component } from "react";

class ContentWrapper extends Component {
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

export default ContentWrapper
