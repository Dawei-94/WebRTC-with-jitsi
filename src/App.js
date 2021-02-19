import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from "./components/Signin";
import JitsiMeet from "./components/JitsiMeet";
import Presenter from "./components/Presenter/Home";
import Participant from "./components/Participant/Home";
import { VideoProvider } from "./context/VideoProvider";
import "./App.css";
import DeviceOptions from "./components/DeviceOptions";

function App() {
  return (
    <>
      <VideoProvider>
        <BrowserRouter>
          <Switch>
           <Route path="/jitsimeet" exact component={JitsiMeet} />
            <Route path="/" exact component={Signin} />
            <Route path="/presenter/:name/:roomID" component={Presenter} />
            <Route
              path="/device-options/:name/:roomID"
              component={DeviceOptions}
            />
            <Route path="/participant/:name/:roomID" component={Participant} />
          </Switch>
        </BrowserRouter>
      </VideoProvider>
    </>
  );
}

export default App;
