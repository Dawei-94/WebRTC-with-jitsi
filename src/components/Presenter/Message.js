import React from "react";

const Message = ({ message, name }) => {
  return (
    <div className="media mt-2">
      <div className="media-body">
        <h5 className="mt-0 text-yellow">{name}</h5>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
