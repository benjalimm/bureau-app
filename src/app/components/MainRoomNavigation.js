import React, { useEffect, useState, useRef } from 'react'
import './MainRoomNavigation.scss'

export default function MainRoomNavigation (props) {

  const [users, setUsers] = useState([{
    name: "Benjamin Lim"
  }, {
    name: "Lana Toogood"
  }])

  const [joined, setJoined] = useState(false)
  const channelRef = useRef('')
  const remoteRef = useRef('')
  const leaveRef = useRef('')
  useEffect(() => {
  }, [])
  return <div className="main">
    <h1 className="header-text">Bureau's office</h1>
    <div>
      { users.map(user => <UserComponent user={user}/>) }
    </div>
  </div>
}


const UserComponent = ({ user }) => {

  return (
    <div className="user-component">
      <span className="circle"/>
      <h3 className="user-name">{user.name}</h3>
    </div>
  )
}