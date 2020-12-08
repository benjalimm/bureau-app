import { join } from 'path'
import React, { useEffect, useState, useRef } from 'react'
import { useAgoraClient, option } from '../services/AgoraManager'
import './MainRoomNavigation.scss'

export default function MainRoomNavigation (props) {

  const [users, setUsers] = useState([{
    name: "Benjamin Lim"
  }, {
    name: "Lana Toogood"
  }])

  const agoraClient = useAgoraClient()

  
  useEffect(() => {
    // if (agoraClient) {
    //   joinRoom(agoraClient, "TEST")
    // }
    
  }, [agoraClient])
  return <div className="main">
    <h1 className="header-text">Bureau's office</h1>
    <div>
      { users.map(user => <UserComponent user={user}/>) }
    </div>
  </div>
}

const joinRoom = (client, channel) => {

  client.join(option.token, channel, option.uid, (uid) => {
    console.log(`Successfully joined room: ${uid}`)
  }, err => {
    console.log(`Failed to join room due to err: ${err}`);
  })
}


const UserComponent = ({ user }) => {

  return (
    <div className="user-component">
      <span className="circle"/>
      <h3 className="user-name">{user.name}</h3>
    </div>
  )
}