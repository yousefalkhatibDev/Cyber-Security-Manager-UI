import React, { Component } from 'react'
import { CgProfile } from 'react-icons/cg'
import Button from "react-bootstrap/Button";

export default class Profile extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='profilePage'>
        <div className='pageHeader'>
          <CgProfile color="green" className='pageHeader-icon' textDecoration="none" />
          <div className='pageHeader-title'>
            <h1>Profile Page</h1>
            <p>Manage your account</p>
          </div>
        </div>
        <div className='profilePage-container'>
          <div className='profileCardInfo'>
            <div className='profileCardInfo-imageContainer'>
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                alt="user-card"
                className='profileCardInfo-image'
              />
            </div>
            <div className='profileCardInfo-inputsContainer'>
              <div className='inputs-group'>
                <label htmlFor="full-name">Full Name</label>
                <input type="text" name="full-name" value="Ahmad almuhidat" className='profileCardInfo-input' />
              </div>
              <div className='inputs-group'>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" disabled value="User12345" className='profileCardInfo-input' />
              </div>
              <div className='inputs-group'>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value="ahmad@cts.com" className='profileCardInfo-input' />
              </div>
              <div style={{ display: "flex", width: "90%" }}>
                <Button variant="success" style={{ borderRadius: "5px" }}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
