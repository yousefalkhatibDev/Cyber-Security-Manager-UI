import React, { Component } from 'react'
import { MDBFooter } from 'mdb-react-ui-kit';

export default class Footer extends Component {
    render() {
        return (
            <MDBFooter bgColor='light' className='text-center text-lg-left'>
                <div className='text-center p-3' style={{ backgroundColor: "#283448", marginTop: "60px", color: "white", width: "100%" }}>
                    &copy; {new Date().getFullYear()} Copyright:{'Cyber Security Manager '}
                </div>
            </MDBFooter>
        )
    }
}
