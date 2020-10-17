import { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk';

// rtc object
var rtc = {
  client: null,
  joined: false,
  published: false,
  localStream: null,
  remoteStreams: [],
  params: {}
};

// Options for joining a channel
var option = {
  appID: 'Your App ID',
  channel: 'Channel name',
  uid: null,
  token: 'Your token'
};

const AgoraManager = () => {
  const [client, _] = useState(AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' }));
  const [joined, setJoined] = useState(false);

  useEffect(() => {

  }, []);
};

export default AgoraManager;
