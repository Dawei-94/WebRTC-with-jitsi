import React, { useReducer, createContext } from "react";

const initialState = {
  users: [],
};

const VideoContext = createContext({
  users: [],
});

function videoReducer(state, action) {
  switch (action.type) {
    case "ADD_VIDEO":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "REMOVE_VIDEO":
      const updatedUsers = state.users.filter(
        (user) => user.socketId !== action.payload
      );
      return {
        ...state,
        user: [...updatedUsers],
      };
    default:
      return state;
  }
}

function VideoProvider(props) {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  function addVideo(payload) {
    dispatch({
      type: "ADD_VIDEO",
      payload,
    });
  }

  function removeVideo(payload) {
    dispatch({ type: "REMOVE_VIDEO", payload });
  }

  function findVideo(payload) {
    dispatch({ type: "FIND_VIDEO", payload });
  }

  return (
    <VideoContext.Provider
      value={{ users: state.users, addVideo, removeVideo, findVideo }}
      {...props}
    />
  );
}

export { VideoContext, VideoProvider };
