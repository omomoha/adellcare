import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import firebase from '../../config/fbConfig';
import {Table, Button, Card} from 'react-bootstrap';
import swal from 'sweetalert';

function Users(props) {
    const [token, setToken] = useState('')
    const [users, setUsers] = useState([])
    const { projects, auth, notifications } = props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user.getIdToken().then(function(idToken) {  // <------ Check this line
              setToken(idToken)
          });
        }
    });
    useEffect(() => {
        if(token){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get('https://us-central1-adellcare.cloudfunctions.net/api/users', {
          })
          .then((res) => {
            setUsers(res.data.users)
          })
          .catch((error) => {
            console.error(error)
          })
        }
    }, [token, users])

    const deleteUser = (data) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                if(token){
                    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                    axios.delete(`https://us-central1-adellcare.cloudfunctions.net/api/users/${data.uid}`, {
                    })
                    .then((res) => {
                        console.log('Successful')
                    })
                    .catch((error) => {
                    console.error(error)
                    })
                }
                window.location.reload()
              swal("User deleted!", {
                icon: "success",
              });
            } else {
              swal("Canceled!");
            }
          });
    }
    return (
        <div>
                <div className="container" style={{margin: '50px auto'}}>
                    <h1 style={{textAlign: 'center', fontWeight: 'bolder'}}>Users</h1>
                    <Card style={{borderRadius: '20px',width: '80%',margin: '50px auto'}}>
                        <Card.Body>
                          {(users.length > 0) ? 
                          <Table striped bordered hover variant="light">
                          <tbody>
                              {users.map((data,index) => (
                             <tr>
                             <td>{index}</td>
                             <td>{data.displayName}</td>
                             <td>{data.email}</td>
                             <td>{data.uid}</td>
                             <td onClick={() => deleteUser(data)} style={{textAlign: 'center'}}>
                                 <i class="fas fa-trash"></i>
                             </td>
                             </tr>
                             ))}
                         </tbody>
                      </Table> : 
                      <h2>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100">
                      <path d="M 50,50 L 33,60.5 a 20 20 -210 1 1 34,0 z" fill="#000">
                        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.2s" repeatCount="indefinite"/>
                      </path>
                        <circle cx="50" cy="50" r="16" fill="#fff"></circle>
                      </svg>
                      </h2>
                          }
                        </Card.Body>
                    </Card>
                 </div>
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
    connect(mapStateToProps))(Users)