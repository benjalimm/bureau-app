import React, { useEffect, useState, useRef } from 'react'
import './MainRoomNavigation.scss'

export default function MainRoomNavigation (props) {
  const [joined, setJoined] = useState(false)
  const channelRef = useRef('')
  const remoteRef = useRef('')
  const leaveRef = useRef('')
  useEffect(() => {

  }, [])
  return <div className="main">
    <h1 className="header-text">Bureau's office</h1>
  </div>
}
