import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';
import firebase from '../../config/fbConfig';



const Dashboard = (props) => {
    const { profile, auth, notifications } = props;
    const [pusher, setPusher] = useState([])
    if (!auth.uid) return <Redirect to='/signin' /> 
    useEffect(() => {
      firebase
        .firestore()
        .collection('users')
        .onSnapshot(res => {
          const data = res.docs.map(_doc => _doc.data())
          setPusher(data)
        })
    }, [])
    // pusher.map(
    //   messageItem => (
    //    console.log(messageItem)
    //   )
    // ) 
    
    return (
      <div className="dashboard container">
        <div className="row m-3">
          <div className="col-md-12 text-center">
            <Card style={{ width: '100%', margin: '50px auto',color: 'white' }}>
            <Card.Body style={{background: 'url(https://cdn.wallpapersafari.com/20/67/aXsjND.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', padding: '100px 200px'}}>
              <Card.Title>{pusher.length} Users</Card.Title>
            </Card.Body>
            </Card>
          </div>
          </div>
          <div className="dashboard container m-4">
            <div className="row">
                  {(pusher.length > 0) ? 
                pusher.map(data => (
                  <div className="col-md-4">
                    <div>
                      <div className="card">
                        <div className="media media--16-9">
                          <div className="actions">
                            {/* <div className="action-icons float-right">
                              {" "}
                              <i
                                className="material-icons action-icon"
                                role="button"
                                title="Bookmark"
                              >
                                bookmark_border
                              </i>{" "}
                              <i className="material-icons action-icon" role="button" title="Share">
                                share
                              </i>{" "}
                            </div> */}
                          </div>
                          <div className="primary-title">
                            <div className="secondary-text">AdellCare</div>
                            <div className="primary-text">{data.roles}</div>
                          </div>
                          <img
                            src="https://image.freepik.com/free-vector/modern-blue-medical-background_1055-6880.jpg"
                            alt
                            width={640}
                            height={426}
                          />{" "}
                        </div>
                        <div className="optional-header">
                          <div className="thumbnail thumbnail--40x40">
                            <img
                              src={data.image}
                              alt
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="primary-title">
                            <div className="title">{data.fullName}</div>
                             <div class="subhead">{data.email}</div>
                          </div>
                          <div className="action-icons">
                            {" "}
                            <i
                              className="material-icons action-icon"
                              role="button"
                              title="More options"
                            >
                              more_vert
                            </i>{" "}
                          </div>
                        </div>
                        <div className="supporting-text">
                          {" "}
                          
                        </div>
                        <div className="actions">
                          <div className="action-icons">{
                          <a href={data.image} download>
                            <i className="material-icons action-icon" role="button" title="Download Image">
                              camera_alt
                            </i>
                          </a>}
                          </div>
                          <div className="action-buttons float-right">
                            {(data.PDF === '') ? <Button variant="warning">No Document</Button> : 
                            <a href={data.PDF} download>
                            <Button variant="success">Download PDF</Button>
                           </a>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                : ''}
            </div>
          </div>
        </div>
    )
  }

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

export default compose(
  connect(mapStateToProps))(Dashboard)
