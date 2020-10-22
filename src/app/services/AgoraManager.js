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
  appID: "934ac8e5e6c54eab8e7e0d20a24c4e6e",
  channel: "TEST",
  uid: null,
  token:"006934ac8e5e6c54eab8e7e0d20a24c4e6eIAA0Hv9wY1dKYLc9O48VadcaN0moHMH0CDkxEWyPYTwoALiT6u4AAAAAEAA222oFpJOSXwEAAQCjk5Jf"
};

const AgoraManager = () => {
  const [client, setClient] = useState(null);
  const [clientErr, setClientError] = useState(null)
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' })
    agoraClient.init(option.appIDn, () => {
      console.log("Successfully initialised agora client")
      setClient(agoraClient)
    }, (err) => {
      setClientError(err)
    });
  }, []);
};

export default AgoraManager;
