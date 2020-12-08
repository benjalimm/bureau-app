import { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk';

// rtc object
export var rtc = {
  client: null,
  joined: false,
  published: false,
  localStream: null,
  remoteStreams: [],
  params: {}
};

// Options for joining a channel
export var option = {
  appID: "934ac8e5e6c54eab8e7e0d20a24c4e6e",
  channel: "TEST",
  uid: null,
  token:"006934ac8e5e6c54eab8e7e0d20a24c4e6eIAA0Hv9wY1dKYLc9O48VadcaN0moHMH0CDkxEWyPYTwoALiT6u4AAAAAEAA222oFpJOSXwEAAQCjk5Jf"
};

export const useAgoraClient = () => {
  const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' })
  const [initializedClient, setInitializedClient] = useState(null);

  // useEffect(() => {
  //   agoraClient.init(option.appID, () => {
  //     console.log("Successfully initialised agora client")
  //     setInitializedClient(agoraClient)
  //   }, (err) => {
  //     console.log(`Failed to initialize agora client due to error: ${err}`)
  //   });

  // }, [agoraClient]);

  return initializedClient
};






