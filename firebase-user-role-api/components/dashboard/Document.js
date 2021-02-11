import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'


function Document(props) {
    const { projects, auth, notifications } = props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps))(Document)