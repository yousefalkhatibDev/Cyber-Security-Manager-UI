import { toHaveFocus } from "@testing-library/jest-dom/dist/matchers";
import React, { Component } from "react";

class ContentWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSideBarClosed: false,
            isMobile: false
        }
    }



    componentDidMount() {
        if (window.innerWidth <= 920 && !this.state.isSideBarClosed) {
            this.setState({ isSideBarClosed: true })
        } else if (window.innerWidth > 920 && this.state.isSideBarClosed) {
            this.setState({ isSideBarClosed: false })
        }
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 920 && !this.state.isSideBarClosed) {
                this.setState({ isSideBarClosed: true })
            } else if (window.innerWidth > 920 && this.state.isSideBarClosed) {
                this.setState({ isSideBarClosed: false })
            }
        })
    }

    render() {
        return (
            <div className={!this.state.isSideBarClosed ? 'ContentWrapper' : 'ContentWrapper ContentWrapper-SideBarClosed'}>
                {this.props.children}
            </div>
        )
    }
}

export default ContentWrapper
