import React, { useRef, useState } from "react";
import { v1 as uuid } from "uuid";
import axios from "axios";

import "../styles/signin.css";

const Signin = (props) => {
  const name = useRef();
  const type = useRef();
  const roomID = useRef();

  const [error, setError] = useState();

  const baseUrl = process.env.REACT_APP_BASE_URL;

  function handleSubmit(event) {
    event.preventDefault();

    let id = roomID.current.value || uuid();
    const roleValue = type.current.value;
    const nameValue = name.current.value;

    if (!roleValue || !nameValue) {
      return setError("You have to enter name.");
    }

    axios
      .get(`${baseUrl}/check`, {
        params: {
          roomID: id,
          role: roleValue,
          name: nameValue,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if (roleValue === "participant") {
            props.history.push(`${roleValue}/${nameValue}/${id}/`);
            return;
          }
          // props.history.push(`/device-options/${nameValue}/${id}/`);
          props.history.push(`/presenter/${nameValue}/${id}/`);
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2>Sign In</h2>
        <form>
          <input
            placeholder={"Name"}
            ref={name}
            type="text"
            className="signin-input name"
          />
          <input
            placeholder={"Room ID"}
            type="text"
            ref={roomID}
            className="signin-input room-id"
          />
          <select name="signin-input" className={"signin-select"} ref={type}>
            <option value="participant">Participant</option>
            <option value="presenter">DJ</option>
          </select>

          <button className="signin-submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        {error && <div className="error-signin">{error}</div>}
      </div>
    </div>
  );
};

export default Signin;
