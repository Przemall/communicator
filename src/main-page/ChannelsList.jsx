import React, { useEffect, useState } from "react";
import { API_URL } from "../api.js";

function ChannelsList({
  token,
  userId,
  name,
  currentChannel,
  setCurrentChannel,
}) {
  const [channelsList, setChannelsList] = useState([]);

  useEffect(() => {
    fetch(API_URL + "/channels.list.joined", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
        "X-User-Id": userId,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setChannelsList(response.channels);
      });
  }, []);

  return (
    <div>
      <div>{name}</div>
      <h3>Channels list:</h3>
      {channelsList.map((channel) => (
        <h4
          key={channel._id}
          onClick={() =>
            setCurrentChannel({ id: channel._id, name: channel.name })
          }
        >
          {channel.name}
          {currentChannel && currentChannel.id === channel._id ? " V" : ""}
        </h4>
      ))}
    </div>
  );
}

export default ChannelsList;
