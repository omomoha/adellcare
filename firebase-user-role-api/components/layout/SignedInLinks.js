import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions';
import {Button} from 'react-bootstrap';

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <NavLink to='/users'><Button className="mr-2" variant="success">Users</Button></NavLink>
        <Button onClick={props.signOut} variant="danger">Log Out</Button>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
