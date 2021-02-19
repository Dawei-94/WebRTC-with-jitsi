import React, { useState, useEffect } from 'react';


function JitsiMeet() {
 const jitsiContainerId = "jitsi-container-id";
    const domain = 'school.video.room';
   const options = {
    roomName: 'roomName',
    height: 400,
    parentNode: document.getElementById(jitsiContainerId),
    interfaceConfigOverwrite: {
     filmStripOnly: false,
     SHOW_JITSI_WATERMARK: false,
    },
    configOverwrite: {
     disableSimulcast: false,
     disableDeepLinking: true
    }};
    
 const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement("script");
    script.src = "https://school.video.room/external_api.js";
    script.async = true;
    script.onload = resolveLoadJitsiScriptPromise
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  };
  
  const [jitsi, setJitsi] = React.useState({});

  // const loadJitsiScript = () => { ... }

  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    
    
    const _jitsi = new window.JitsiMeetExternalAPI("school.video.room", {
      roomName: 'roomName',
      parentNode: document.getElementById(jitsiContainerId),
      interfaceConfigOverwrite: {
      filmStripOnly: false,
      SHOW_JITSI_WATERMARK: false,
    },
    configOverwrite: {},
    }
    );

    setJitsi(_jitsi)
  };

  React.useEffect(() => {
    initialiseJitsi();
    return () => jitsi?.dispose?.();
  }, []);
  

  return <div id={jitsiContainerId} style={{ height: 720, width: "100%" }} />;


}

export default JitsiMeet;